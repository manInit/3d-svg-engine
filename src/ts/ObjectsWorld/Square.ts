import ObjectWorld from '../core/ObjectWorld'
import type Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Square extends ObjectWorld {
  constructor(size: number, center: Point, color = 'black', texture?: string) {
    super()
    this.polygons = [
      new Polygon(
        [
          { x: -size / 2, y: -size / 2, z: 0 },
          { x: size / 2, y: -size / 2, z: 0 },
          { x: size / 2, y: size / 2, z: 0 },
          { x: -size / 2, y: size / 2, z: 0 },
        ],
        color,
      ),
    ]

    if (texture) this.setTexture(texture)
    this.translate(center.x, center.y, center.z)
  }
}
