import ObjectWorld from './ObjectWorld'
import RenderPipe from './RenderPipe'
import { createSVGElem, createSVGGElem } from '../utils/svgElements'
import { degToRad } from '../utils/angle'
import Camera from './Camera'
import Polygon from './Polygon'
import BackgroundElem from '../ObjectsWorld/BackgroundElem'

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
  private styleString = ''
  private updateFunction: () => void

  private zFar = 1000000
  private fov = 45

  constructor(root: HTMLElement) {
    this.svgRoot = createSVGElem()
    this.groupObject = createSVGGElem()
    this.svgRoot.append(this.groupObject)
    root.append(this.svgRoot)
    this.root = root
    this.root.classList.add('wallpaper')

    const z0 = this.calcZ0(this.fov, this.zFar)
    this.camera = new Camera(root)

    this.renderPipe = new RenderPipe(root.clientWidth, root.clientHeight, z0, this.zFar, this.camera)
  }

  get cameraObj(): Camera {
    return this.camera
  }

  get svgRootElement(): SVGSVGElement {
    return this.svgRoot
  }

  public addBgElem(...elems: BackgroundElem[]) {
    for (const elem of elems) {
      this.styleString += elem.styleBg + ','
    }
    this.root.style.background = this.styleString.slice(0, -1)
    this.bgElems.push(...elems)
  }

  private updateBg() {
    this.styleString = ''
    let bgSizes = ''

    for (let i = 0; i < this.bgElems.length; i++) {
      this.bgElems[i].update(this.root.clientWidth, this.camera.rotation.ay)
      this.styleString += this.bgElems[i].styleBg
      bgSizes += '100px'
      if (i < this.bgElems.length - 1) {
        this.styleString += ', '
        bgSizes += ', '
      }
    }
  
    if (this.bgElems.length !== 0) {
      bgSizes += ', '
      this.styleString += ', ' 
    }
      
    const maxBgPos = this.bg.width + this.root.clientWidth
    const a = this.camera.rotation.ay
    const xPos = a * maxBgPos / 360

    this.styleString += `url("${this.bg.url}") ${-xPos}px 0 repeat-x` 
    bgSizes += 'cover'

    this.root.style.background = this.styleString
    this.root.style.backgroundSize = bgSizes
  }

  public setBackground(url: string): void {
    const image = new Image()
    image.src = url
    this.bg.url = url
    image.onload = () => {
      this.bg.width = image.width
    }
  }

  public addObjects(...objects: ObjectWorld[]) {
    for (const obj of objects) {
      for (const p of obj.polygons) {
        if (p.texture)
          this.svgRoot.prepend(p.texture)
        this.groupObject.append(p.tagElem)
        this.polygons.push(p)
      }
    }
    
    this.objects.push(...objects)
  }

  public setUpdateFunction(cb: () => void): void {
    this.updateFunction = cb
  }

  //animate
  public run(fps: number) {
    let fpsInterval: number 
    let now: number
    let past: number
  
    const animate = () => {
      requestAnimationFrame(animate)
      now = Date.now()
      const elapsed = now - past
      if (elapsed > fpsInterval) {
        past = now - (elapsed % fpsInterval)
        this.render()
      }
    }
  
    const startAnimating = () => {
      fpsInterval = 1000 / fps
      past = Date.now()
      animate()
    }

    startAnimating()
  }  

  private calcZ0(fov: number, zFar: number) {
    fov = degToRad(fov)
    const farWidth = 2 * zFar * Math.tan(fov / 2)
    return zFar * this.root.clientWidth / farWidth
  }

  private render(): void {
    this.camera.update()
    this.updateBg()
    if (this.updateFunction) {
      this.updateFunction()
    }
    if (this.polygons.length === 0) return

    for (const p of this.polygons) {
      p.render(this.renderPipe)
    }
    this.polygons.sort((p1, p2) => p2.averageDistance - p1.averageDistance)

    let jStart = 0
    let i = 0
    while (this.polygons[i].tagElem.isEqualNode(this.groupObject.children[i])) {
      i++
      jStart = i

      if (jStart >= this.polygons.length - 1) return
    }

    for (let j = jStart; j < this.polygons.length; j++) {
      this.groupObject.insertBefore(this.polygons[j].tagElem, this.groupObject.children[j])
    }
  }
}