import Point from './Point'

export default class Polygon {
  private elem: SVGPolygonElement
  private root: SVGSVGElement

  constructor(svgRoot: SVGSVGElement, polygonElement: SVGPolygonElement) {
    this.elem = polygonElement
    this.root = svgRoot
  }

  public setPoints(points: Point[]): void {
    this.elem.points.clear()
    
    for (const point of points) {
      const svgPoint: SVGPoint = this.root.createSVGPoint()

      svgPoint.x = point.x 
      svgPoint.y = point.y

      this.elem.points.appendItem(svgPoint)
    }
  }
}