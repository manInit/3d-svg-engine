import ObjectWorld from '../core/ObjectWorld'
import type Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Triangle extends ObjectWorld {
  constructor(point1: Point, point2: Point, point3: Point, color = 'black', texture?: string) {
    super()
    this.polygons = [new Polygon([{ ...point1 }, { ...point2 }, { ...point3 }], color)]
    //центр треугольника — центр масс вершин
    this.center = {
      x: (point1.x + point2.x + point3.x) / 3,
      y: (point1.y + point2.y + point3.y) / 3,
      z: (point1.z + point2.z + point3.z) / 3,
    }

    this.setDoubleSided(true)
    if (texture) this.setTexture(texture)
  }
}
