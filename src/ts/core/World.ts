import ObjectWorld from './ObjectWorld'
import RenderPipe from './RenderPipe'
import { createSVGElem, createSVGGElem } from '../utils/svgElements'
import { degToRad } from '../utils/angle'
import Camera from './Camera'
import Polygon from './Polygon'
import BackgroundElem from '../ObjectsWorld/BackgroundElem'
import { createFog, createLight, defaultLight, type Environment, type FogOptions, type LightOptions } from './Lighting'

export interface GlowOptions {
  /** радиус размытия свечения в пикселях */
  blur: number
  /** сколько раз наложить свечение: больше — ярче */
  strength: number
}

const GLOW_ID = 'svg-engine-glow'

export default class World {
  private renderPipe: RenderPipe
  private objects: ObjectWorld[] = []
  private polygons: Polygon[] = []
  private bgElems: BackgroundElem[] = []
  private svgRoot: SVGSVGElement
  private groupObject: SVGGElement
  private root: HTMLElement
  private camera: Camera
  private bg = { width: 0, url: '' }
  private bgStyle = ''
  private bgSizeStyle = ''
  private updateFunction: (() => void) | null = null
  private animationId: number | null = null
  private resizeObserver: ResizeObserver | null = null
  private resizeHandler = () => this.updateViewport()

  private lightOptions: LightOptions | null = { ...defaultLight }
  private fogOptions: FogOptions | null = null
  private env: Environment = { light: createLight(defaultLight), fog: null, cameraPosition: { x: 0, y: 0, z: 0 } }
  private glowElem: SVGDefsElement | null = null

  private zFar = 1000000
  private fov = 45

  constructor(root: HTMLElement) {
    this.svgRoot = createSVGElem()
    this.svgRoot.style.width = '100%'
    this.svgRoot.style.height = '100%'
    this.svgRoot.style.display = 'block'
    this.groupObject = createSVGGElem()
    this.svgRoot.append(this.groupObject)
    root.append(this.svgRoot)
    this.root = root

    this.camera = new Camera(root)
    this.renderPipe = new RenderPipe(root.clientWidth, root.clientHeight, this.calcZ0(), this.zFar, this.camera)

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.resizeHandler)
      this.resizeObserver.observe(root)
    } else {
      window.addEventListener('resize', this.resizeHandler)
    }
  }

  get cameraObj(): Camera {
    return this.camera
  }

  get objectList(): readonly ObjectWorld[] {
    return this.objects
  }

  get svgRootElement(): SVGSVGElement {
    return this.svgRoot
  }

  get light(): LightOptions | null {
    return this.lightOptions && { ...this.lightOptions }
  }

  get fog(): FogOptions | null {
    return this.fogOptions && { ...this.fogOptions }
  }

  /** настройки освещения (недостающие поля берутся из текущих); null — выключить свет */
  public setLight(options: Partial<LightOptions> | null): void {
    this.lightOptions = options && { ...(this.lightOptions ?? defaultLight), ...options }
    this.env.light = this.lightOptions && createLight(this.lightOptions)
  }

  /** линейный туман по дистанции до камеры; null — выключить */
  public setFog(options: Partial<FogOptions> | null): void {
    const prev = this.fogOptions ?? { color: '#ffffff', near: 100, far: 600 }
    this.fogOptions = options && { ...prev, ...options }
    this.env.fog = this.fogOptions && createFog(this.fogOptions)
  }

  /** неоновое свечение всей сцены через SVG-фильтр; null — выключить */
  public setGlow(options: Partial<GlowOptions> | null): void {
    this.glowElem?.remove()
    this.glowElem = null
    this.groupObject.removeAttribute('filter')
    if (!options) return

    const blur = options.blur ?? 4
    const strength = Math.max(1, Math.round(options.strength ?? 2))
    const ns = 'http://www.w3.org/2000/svg'

    const defs = document.createElementNS(ns, 'defs')
    const filter = document.createElementNS(ns, 'filter')
    filter.id = GLOW_ID
    filter.setAttribute('x', '-20%')
    filter.setAttribute('y', '-20%')
    filter.setAttribute('width', '140%')
    filter.setAttribute('height', '140%')

    const gauss = document.createElementNS(ns, 'feGaussianBlur')
    gauss.setAttribute('in', 'SourceGraphic')
    gauss.setAttribute('stdDeviation', String(blur))
    gauss.setAttribute('result', 'blur')

    const merge = document.createElementNS(ns, 'feMerge')
    for (let i = 0; i < strength; i++) {
      const node = document.createElementNS(ns, 'feMergeNode')
      node.setAttribute('in', 'blur')
      merge.append(node)
    }
    const source = document.createElementNS(ns, 'feMergeNode')
    source.setAttribute('in', 'SourceGraphic')
    merge.append(source)

    filter.append(gauss, merge)
    defs.append(filter)
    this.svgRoot.prepend(defs)
    this.glowElem = defs
    this.groupObject.setAttribute('filter', `url(#${GLOW_ID})`)
  }

  /**
   * Текущий кадр как самостоятельный SVG-документ: его можно открыть
   * в Figma, Illustrator, Inkscape или в браузере и редактировать как вектор.
   */
  public toSVG(background?: string): string {
    const width = this.root.clientWidth
    const height = this.root.clientHeight
    const clone = this.svgRoot.cloneNode(true) as SVGSVGElement

    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('width', String(width))
    clone.setAttribute('height', String(height))
    clone.setAttribute('viewBox', `0 0 ${width} ${height}`)
    clone.removeAttribute('style')

    //скрытые и отсечённые полигоны в файле не нужны
    for (const polygon of clone.querySelectorAll('polygon')) {
      if (!polygon.getAttribute('points')) polygon.remove()
    }

    const bg = background ?? this.fogOptions?.color
    if (bg) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('width', '100%')
      rect.setAttribute('height', '100%')
      rect.setAttribute('fill', bg)
      clone.prepend(rect)
    }

    return '<?xml version="1.0" standalone="no"?>\n' + new XMLSerializer().serializeToString(clone)
  }

  public addBgElem(...elems: BackgroundElem[]): void {
    this.bgElems.push(...elems)
  }

  public setBackground(url: string): void {
    this.bg.url = url
    this.bg.width = 0

    const image = new Image()
    image.addEventListener('load', () => {
      if (this.bg.url === url) this.bg.width = image.width
    })
    image.src = url
  }

  public addObjects(...objects: ObjectWorld[]): void {
    for (const obj of objects) {
      if (this.objects.includes(obj)) continue

      for (const p of obj.polygons) {
        if (p.texture) this.svgRoot.prepend(p.texture)
        this.groupObject.append(p.tagElem)
        this.polygons.push(p)
      }
      this.objects.push(obj)
    }
  }

  public removeObjects(...objects: ObjectWorld[]): void {
    const removed = new Set<Polygon>()
    for (const obj of objects) {
      const index = this.objects.indexOf(obj)
      if (index === -1) continue

      this.objects.splice(index, 1)
      for (const p of obj.polygons) {
        p.tagElem.remove()
        p.texture?.remove()
        removed.add(p)
      }
    }
    this.polygons = this.polygons.filter((p) => !removed.has(p))
  }

  public setUpdateFunction(cb: (() => void) | null): void {
    this.updateFunction = cb
  }

  //animate
  public run(fps: number): void {
    this.stop()

    const fpsInterval = 1000 / fps
    let past = performance.now()

    const animate = (now: number) => {
      this.animationId = requestAnimationFrame(animate)
      const elapsed = now - past
      if (elapsed >= fpsInterval) {
        past = now - (elapsed % fpsInterval)
        this.render()
      }
    }

    this.animationId = requestAnimationFrame(animate)
  }

  public stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  public destroy(): void {
    this.stop()
    this.camera.destroy()
    this.resizeObserver?.disconnect()
    window.removeEventListener('resize', this.resizeHandler)
    this.svgRoot.remove()
    this.root.style.background = ''
    this.root.style.backgroundSize = ''
  }

  private updateViewport(): void {
    this.renderPipe.setViewport(this.root.clientWidth, this.root.clientHeight, this.calcZ0())
  }

  private calcZ0(): number {
    //фокусное расстояние, при котором горизонтальный угол обзора равен fov
    return this.root.clientWidth / (2 * Math.tan(degToRad(this.fov) / 2))
  }

  private updateBg(): void {
    const layers: string[] = []
    const sizes: string[] = []

    for (const elem of this.bgElems) {
      elem.update(this.root.clientWidth, this.camera.rotation.ay)
      layers.push(elem.styleBg)
      sizes.push('auto')
    }

    if (this.bg.url) {
      const maxBgPos = this.bg.width + this.root.clientWidth
      const xPos = (this.camera.rotation.ay * maxBgPos) / 360

      layers.push(`url("${this.bg.url}") ${-xPos}px 0 repeat-x`)
      sizes.push('cover')
    }

    const bgStyle = layers.join(', ')
    const bgSizeStyle = sizes.join(', ')
    //не трогаем стили без необходимости, это дорогая операция
    if (bgStyle === this.bgStyle && bgSizeStyle === this.bgSizeStyle) return

    this.bgStyle = bgStyle
    this.bgSizeStyle = bgSizeStyle
    this.root.style.background = bgStyle
    this.root.style.backgroundSize = bgSizeStyle
  }

  public render(): void {
    this.camera.update()
    this.updateBg()
    if (this.updateFunction) {
      this.updateFunction()
    }

    const { x, y, z } = this.camera.position
    this.env.cameraPosition = { x, y, z }
    for (const p of this.polygons) {
      p.render(this.renderPipe, this.env)
    }
    //алгоритм художника: сначала рисуем дальние полигоны
    //у невидимых полигонов дистанция Infinity, Infinity - Infinity = NaN
    this.polygons.sort((p1, p2) => p2.averageDistance - p1.averageDistance || 0)

    //переставляем в DOM только те элементы, чей порядок изменился
    const children = this.groupObject.children
    for (let i = 0; i < this.polygons.length; i++) {
      const elem = this.polygons[i].tagElem
      if (children[i] !== elem) {
        this.groupObject.insertBefore(elem, children[i] ?? null)
      }
    }
  }
}
