import ObjectWorld from './ObjectWorld'
import RenderPipe from './RenderPipe'
import { createSVGElem } from '../utils/svgElements'
import { degToRad } from '../utils/angle'
import Camera from './Camera'
import Polygon from './Polygon'

export default class World {
  private renderPipe: RenderPipe
  private objects: ObjectWorld[] = []
  private polygons: Polygon[] = []
  private svgRoot: SVGSVGElement
  private root: HTMLElement
  private camera: Camera
  private bgWidth = 0

  private zFar = 1000000
  private fov = 45

  constructor(root: HTMLElement) {
    this.svgRoot = createSVGElem()
    root.append(this.svgRoot)
    this.root = root
    this.root.classList.add('wallpaper')

    const z0 = this.calcZ0(this.fov, this.zFar)
    this.camera = new Camera(root)

    this.renderPipe = new RenderPipe(root.clientWidth, root.clientHeight, z0, this.zFar, this.camera)
  }

  public setBackground(url: string): void {
    const image = new Image()
    image.src = url

    image.onload = () => {
      this.root.style.backgroundImage = `url(${url})`
      this.bgWidth = image.width
    }
  }

  public addObjects(...objects: ObjectWorld[]) {
    for (const obj of objects) {
      for (const p of obj.polygons) {
        this.svgRoot.append(p.tagElem)
        this.polygons.push(p)
      }
    }
    
    this.objects.push(...objects)
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

    const maxBgPos = this.bgWidth + this.root.clientWidth
    const a = this.camera.rotation.ay
    const xPos = a * maxBgPos / 360
    this.root.style.backgroundPositionX = -xPos + 'px'

    for (const p of this.polygons) {
      p.render(this.renderPipe)
    }
  
    //отсоритровать по averageDistance
    this.polygons.sort((p1, p2) => p2.averageDistance - p1.averageDistance)
    //изменяем  dom
    let jStart = 0
    let i = 0
    while (this.polygons[i].tagElem.isEqualNode(this.svgRoot.children[i])) {
      i++
      jStart = i

      if (jStart >= this.polygons.length - 1) return
    }

    for (let j = jStart; j < this.polygons.length; j++) {
      this.svgRoot.insertBefore(this.polygons[j].tagElem, this.svgRoot.children[j])
    }
  }
}