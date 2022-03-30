import Camera from '../core/Camera'
import Point from '../core/Point'
import Polygon from '../core/Polygon'
import RenderPipe from '../core/RenderPipe'

export default class ObjectWorld {
  public points: Point[]
  public polygon: Polygon
  public renderPipe: RenderPipe
  public color: string

  constructor(points: Point[], polygon?: Polygon, color?: string) {
    this.points = points
    this.polygon = polygon ?? null
    this.color = color ?? null
  }

  public render(isDepth = false): void {
    const camera = Camera.getInstance()

    if (!this.renderPipe || !this.polygon) return
    if (this.color && !this.polygon.textureUrl) this.polygon.setColor(this.color)

    const projectionPoints: Point[] = this.renderPipe.render(this.points)

    if (this.polygon.textureElem) {
      const pattern = this.polygon.textureElem.querySelector('image') as SVGImageElement
      pattern.style.transform = `rotateY(${camera.rotation.ay * Math.PI / 180})`
    }
    

    this.polygon.setPoints(projectionPoints, isDepth)
  }
}