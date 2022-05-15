import ObjectWorld from '../core/ObjectWorld'
import Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Triangle extends ObjectWorld {
  constructor(point1: Point, point2: Point, point3: Point, color = 'black', texture?: string) {
    super()
    this.polygons = [
      new Polygon([
        point1,
        point2,
        point3
      ], color)
    ]

    if (texture) {
      for (const p of this.polygons) p.setTexture(texture)
    }
  }
}