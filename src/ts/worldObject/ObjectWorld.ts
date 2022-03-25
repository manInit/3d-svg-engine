import Point from '../core/Point'
import Polygon from '../core/Polygon'
import RenderPipe from '../core/RenderPipe'

export default class ObjectWorld {
  public points: Point[]
  public polygon: Polygon
  public renderPipe: RenderPipe

  constructor(points: Point[], polygon?: Polygon) {
    this.points = points
    this.polygon = polygon ?? null
  }

  public render(isDepth = false): void {
    if (!this.renderPipe || !this.polygon) return

    const projectionPoints: Point[] = this.renderPipe.render(this.points)
    this.polygon.setPoints(projectionPoints, isDepth)
  }
}