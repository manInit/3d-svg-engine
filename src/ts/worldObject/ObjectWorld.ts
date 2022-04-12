import Point from '../core/Point'
import Polygon from '../core/Polygon'
import RenderPipe from '../core/RenderPipe'

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

}