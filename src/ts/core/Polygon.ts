import { createTextureElement } from '../utils/svgElements'
import Point from './Point'

export default class Polygon {
  private elem: SVGPolygonElement
  private root: SVGSVGElement
  public textureUrl: string
  public textureElem: SVGDefsElement

  constructor(svgRoot: SVGSVGElement, polygonElement: SVGPolygonElement, color = 'blue') {
    this.elem = polygonElement
    this.root = svgRoot
    this.elem.setAttribute('fill', color)
  }

  public setTexture(textureUrl?: string): void {
    if (textureUrl) {
      this.textureUrl = textureUrl
      const defs = createTextureElement(this.textureUrl)
      this.textureElem = defs
      this.root.prepend(defs)
    }
    
    this.elem.setAttribute('fill', 'url(#img)')
    if (!this.textureUrl) return
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