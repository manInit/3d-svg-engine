import Camera from '../core/Camera'
import Point from '../core/Point'
import Polygon from '../core/Polygon'
import RenderPipe from '../core/RenderPipe'
import { degToRad, radToDeg } from '../utils/angle'

export default class ObjectWorld {
  public points: Point[]
  public polygon: Polygon
  public renderPipe: RenderPipe
  public color: string
  private textureUrl: string

  constructor(points: Point[], polygon?: Polygon, color?: string) {
    this.points = points
    this.polygon = polygon ?? null
    this.color = color ?? null
  }

  public setTexture(url: string): void {
    this.textureUrl = url
  }

  public render(isDepth = false): void {
    if (!this.renderPipe || !this.polygon) return
    if (this.color && !this.polygon.textureUrl) this.polygon.setColor(this.color)

    const projectionPoints: Point[] = this.renderPipe.render(this.points)

    if (this.textureUrl) {
      if (!this.polygon.textureElem)
        this.polygon.setTexture(this.textureUrl)

      const pattern = this.polygon.textureElem.querySelector('pattern') as SVGPatternElement
      // pattern.setAttribute('patternTransform', `rotate(${-0}) translate(0 0)`)
    }
    
    this.polygon.setPoints(projectionPoints, isDepth)
  }


  private findNormal(points: Point[]): Point {
    const vx1 = points[0].x - points[1].x
    const vy1 = points[0].y - points[1].y 
    const vz1 = points[0].z - points[1].z 
    const vx2 = points[1].x - points[2].x
    const vy2 = points[1].y - points[2].y
    const vz2 = points[1].z - points[2].z

    const wrki = Math.sqrt((vy1*vz2-vz1*vy2) ** 2 + (vz1*vx2-vx1*vz2) ** 2 + (vx1*vy2-vy1*vx2) ** 2)

    return {
      x: (vy1 * vz2 - vz1 * vy2)/wrki,
      y: (vz1 * vx2 - vx1 * vz2)/wrki,
      z: (vx1 * vy2 - vy1 * vx2)/wrki
    }
  }
}