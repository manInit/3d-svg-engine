import Point from './Point'

export default class Polygon {
  private elem: SVGPolygonElement
  private root: SVGSVGElement

  constructor(svgRoot: SVGSVGElement, polygonElement: SVGPolygonElement, color = 'blue') {
    this.elem = polygonElement
    this.root = svgRoot
    this.elem.setAttribute('fill', color)
  }

  public setColor(color: string): void {
    this.elem.setAttribute('fill', color)
  }

  public setPoints(points: Point[], isDepth: boolean): void {
    this.elem.points.clear()
    
    for (const point of points) {
      const svgPoint: SVGPoint = this.root.createSVGPoint()

      svgPoint.x = point.x 
      svgPoint.y = point.y

      if (isDepth) this.root.style.zIndex = Math.ceil(point.z).toString()
          
      this.elem.points.appendItem(svgPoint)
    }
  }
}