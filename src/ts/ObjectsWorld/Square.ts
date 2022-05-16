import ObjectWorld from '../core/ObjectWorld'
import Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Square extends ObjectWorld {
  constructor(size: number, center: Point, color: string) {
    super()
    this.polygons = [
      new Polygon([
        { x: -size / 2, y: -size / 2, z: 0 }, 
        { x: size / 2, y: -size / 2, z: 0 }, 
        { x: size / 2, y: size / 2, z: 0 }, 
        { x: -size / 2, y: size / 2, z: 0 }
      ], color)
    ]
    this.translate(center.x, center.y, center.z)
  }
}