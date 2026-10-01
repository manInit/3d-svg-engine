import ObjectWorld from '../core/ObjectWorld'
import type Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Pyramid extends ObjectWorld {
  constructor(size: number, center: Point, color = 'black', texture?: string) {
    super()
    this.polygons = [
      //нижняя
      new Polygon(
        [
          { x: -size / 2, y: -size / 2, z: -size / 2 },
          { x: size / 2, y: -size / 2, z: -size / 2 },
          { x: size / 2, y: -size / 2, z: size / 2 },
          { x: -size / 2, y: -size / 2, z: size / 2 },
        ],
        color,
      ),
      // правая
      new Polygon(
        [
          { x: size / 2, y: -size / 2, z: -size / 2 },
          { x: size / 2, y: -size / 2, z: size / 2 },
          { x: 0, y: size / 2, z: 0 },
        ],
        color,
      ),
      //левая
      new Polygon(
        [
          { x: -size / 2, y: -size / 2, z: -size / 2 },
          { x: -size / 2, y: -size / 2, z: size / 2 },
          { x: 0, y: size / 2, z: 0 },
        ],
        color,
      ),
      //передняя
      new Polygon(
        [
          { x: -size / 2, y: -size / 2, z: size / 2 },
          { x: size / 2, y: -size / 2, z: size / 2 },
          { x: 0, y: size / 2, z: 0 },
        ],
        color,
      ),
      //задняя
      new Polygon(
        [
          { x: -size / 2, y: -size / 2, z: -size / 2 },
          { x: size / 2, y: -size / 2, z: -size / 2 },
          { x: 0, y: size / 2, z: 0 },
        ],
        color,
      ),
    ]

    if (texture) this.setTexture(texture)
    this.translate(center.x, center.y, center.z)
  }
}
