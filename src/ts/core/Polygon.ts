import { createPolygonElem, createSVGElem } from '../utils/svgElements'
import Point from './Point'
import RenderPipe from './RenderPipe'

export default class Polygon {
  private root: SVGSVGElement
  private elem: SVGPolygonElement

  public points: Point[]
  public averageDistance: number

  constructor(points: Point[] = [], color = 'black') {
    this.root = createSVGElem()
    this.elem = createPolygonElem()
    this.elem.setAttribute('fill', color)

    this.points = points
  }

  set fillColor(color: string) {
    this.elem.setAttribute('fill', color)
  }

  get tagElem(): SVGPolygonElement {
    return this.elem
  }

  public render(renderPipe: RenderPipe): void {
    this.elem.points.clear()
    const { points: projectPoints, averageDistance }= renderPipe.convertPoints(this.points)
    this.averageDistance = averageDistance

    for (const point of projectPoints) {
      const svgPoint: SVGPoint = this.root.createSVGPoint()
      svgPoint.x = point.x 
      svgPoint.y = point.y
          
      this.elem.points.appendItem(svgPoint)
    }
  }
}