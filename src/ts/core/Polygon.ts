import { createPolygonElem, createSVGElem, createTextureElement } from '../utils/svgElements'
import Point from './Point'
import RenderPipe from './RenderPipe'

export default class Polygon {
  public static count = 0

  private root: SVGSVGElement
  private elem: SVGPolygonElement
  private textrueElem: SVGDefsElement
  private number: number

  public points: Point[]
  public averageDistance: number

  constructor(points: Point[] = [], color = 'black') {
    this.root = createSVGElem()
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

  get texture(): SVGDefsElement {
    return this.textrueElem
  }

  public setTexture(url: string) {
    this.elem.id = 'defs-' + this.number
    this.textrueElem = createTextureElement(url, this.elem.id)
    this.elem.setAttribute('fill', `url(#${this.elem.id})`)
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