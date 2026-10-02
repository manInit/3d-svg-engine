import { createPolygonElem, createTextureElement } from '../utils/svgElements'
import { parseColor, toCss } from '../utils/color'
import { centroid, dot, normalize, polygonNormal, sub } from '../utils/vector'
import { applyFog, fogFactor, shade, type Environment } from './Lighting'
import type Point from './Point'
import RenderPipe from './RenderPipe'

export default class Polygon {
  private static count = 0

  private elem: SVGPolygonElement
  private textureElem: SVGDefsElement | null = null
  private number: number
  private color: string
  private strokeColor: string | null = null
  //последние записанные в DOM значения: setAttribute дорогой, лишний раз не трогаем
  private shownFill = ''
  private shownStroke = ''
  private shownOpacity = ''

  public points: Point[]
  public averageDistance = Infinity
  /** учитывать ли освещение при расчёте цвета заливки */
  public shaded = true
  /** двусторонний полигон не отсекается, когда повёрнут к камере обратной стороной */
  public doubleSided = false

  constructor(points: Point[] = [], color = 'black') {
    this.elem = createPolygonElem()
    this.color = color
    this.setFill(color)

    this.points = points

    Polygon.count++
    this.number = Polygon.count
  }

  set fillColor(color: string) {
    this.color = color
    if (!this.textureElem) this.setFill(color)
  }

  get fillColor(): string {
    return this.color
  }

  get tagElem(): SVGPolygonElement {
    return this.elem
  }

  get texture(): SVGDefsElement | null {
    return this.textureElem
  }

  /** нормаль по порядку обхода вершин (не нормирована) */
  get normal(): Point {
    return polygonNormal(this.points)
  }

  public setStroke(color: string | null, width = 1): void {
    this.strokeColor = color
    if (color === null) {
      this.elem.removeAttribute('stroke')
      this.elem.removeAttribute('stroke-width')
      this.elem.removeAttribute('stroke-linejoin')
      this.shownStroke = ''
      return
    }
    this.elem.setAttribute('stroke-width', String(width))
    this.elem.setAttribute('stroke-linejoin', 'round')
    this.setStrokeAttr(color)
  }

  public setTexture(url: string): void {
    const id = 'texture-' + this.number
    const svgRoot = this.elem.ownerSVGElement

    this.textureElem?.remove()
    this.textureElem = createTextureElement(url, id)
    this.setFill(`url(#${id})`)

    //полигон уже на сцене — сразу добавляем определение текстуры
    if (svgRoot) svgRoot.prepend(this.textureElem)
  }

  /** меняет порядок обхода вершин, а значит и направление нормали */
  public flip(): void {
    this.points = this.points.map((_, i, all) => all[all.length - 1 - i])
  }

  public render(renderPipe: RenderPipe, env?: Environment): void {
    let normal: Point | null = null
    let toCamera: Point | null = null

    if (env) {
      const center = centroid(this.points)
      toCamera = normalize(sub(env.cameraPosition, center))
      normal = normalize(polygonNormal(this.points))

      if (dot(normal, toCamera) < 0) {
        if (!this.doubleSided) return this.hide()
        normal = { x: -normal.x, y: -normal.y, z: -normal.z }
      }
    }

    const { points, averageDistance } = renderPipe.convertPoints(this.points)
    this.averageDistance = averageDistance
    if (points.length === 0) return this.hide()

    this.elem.setAttribute('points', points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '))

    if (env) this.updateColors(env, normal, toCamera)
  }

  private updateColors(env: Environment, normal: Point | null, toCamera: Point | null): void {
    const fog = env.fog ? fogFactor(this.averageDistance, env.fog) : 0

    if (this.textureElem) {
      //текстуру нельзя перекрасить, поэтому в тумане она просто растворяется в фоне
      this.setOpacity(fog > 0 ? (1 - fog).toFixed(2) : '')
    } else {
      const base = parseColor(this.color)
      if (base) {
        let rgb = base
        if (this.shaded && env.light && normal && toCamera) rgb = shade(base, normal, toCamera, env.light)
        if (env.fog) rgb = applyFog(rgb, fog, env.fog)
        const fill = toCss(rgb)
        this.setFill(fill)
        //тонкая обводка цветом заливки закрывает светлые швы сглаживания между соседними гранями
        if (this.strokeColor === null) this.setSeam(fill)
      } else {
        this.setFill(this.color)
        if (this.strokeColor === null) this.setSeam(null)
      }
    }

    if (this.strokeColor !== null) {
      const stroke = parseColor(this.strokeColor)
      this.setStrokeAttr(stroke && env.fog ? toCss(applyFog(stroke, fog, env.fog)) : this.strokeColor)
    }
  }

  private setSeam(color: string | null): void {
    if (color === null) {
      if (this.shownStroke) this.setStroke(null)
      return
    }
    if (!this.shownStroke) this.elem.setAttribute('stroke-width', '0.6')
    this.setStrokeAttr(color)
  }

  private hide(): void {
    this.averageDistance = Infinity
    this.elem.setAttribute('points', '')
  }

  private setFill(value: string): void {
    if (value === this.shownFill) return
    this.shownFill = value
    this.elem.setAttribute('fill', value)
  }

  private setStrokeAttr(value: string): void {
    if (value === this.shownStroke) return
    this.shownStroke = value
    this.elem.setAttribute('stroke', value)
  }

  private setOpacity(value: string): void {
    if (value === this.shownOpacity) return
    this.shownOpacity = value
    if (value) this.elem.setAttribute('opacity', value)
    else this.elem.removeAttribute('opacity')
  }
}
