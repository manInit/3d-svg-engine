import { createPolygonElem, createTextureElement } from '../utils/svgElements'
import type Point from './Point'
import RenderPipe from './RenderPipe'

export default class Polygon {
  private static count = 0

  private elem: SVGPolygonElement
  private textureElem: SVGDefsElement | null = null
  private number: number

  public points: Point[]
  public averageDistance = Infinity

  constructor(points: Point[] = [], color = 'black') {
    this.elem = createPolygonElem()
    this.elem.setAttribute('fill', color)

    this.points = points

    Polygon.count++
    this.number = Polygon.count
  }

  set fillColor(color: string) {
    this.elem.setAttribute('fill', color)
  }

  get tagElem(): SVGPolygonElement {
    return this.elem
  }

  get texture(): SVGDefsElement | null {
    return this.textureElem
  }

  public setTexture(url: string): void {
    const id = 'texture-' + this.number
    const svgRoot = this.elem.ownerSVGElement

    this.textureElem?.remove()
    this.textureElem = createTextureElement(url, id)
    this.elem.setAttribute('fill', `url(#${id})`)

    //полигон уже на сцене — сразу добавляем определение текстуры
    if (svgRoot) svgRoot.prepend(this.textureElem)
  }

  public render(renderPipe: RenderPipe): void {
    const { points, averageDistance } = renderPipe.convertPoints(this.points)
    this.averageDistance = averageDistance

    this.elem.setAttribute('points', points.map((p) => `${p.x},${p.y}`).join(' '))
  }
}
