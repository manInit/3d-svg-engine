import ObjectWorld from '../core/ObjectWorld'
import Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Cube extends ObjectWorld {
  constructor(size: number, center: Point) {
    super()
    this.polygons = [
      //задняя плоскость
      new Polygon([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 },
        { x: -size / 2, y: size / 2, z: -size / 2 }
      ]),
      //передняя плоскость
      new Polygon([
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 }
      ]),
      //верхняя
      new Polygon([
        { x: -size / 2, y: size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 }
      ]),
      //нижняя
      new Polygon([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: -size / 2, y: -size / 2, z: size / 2 }
      ]),
      // правая
      new Polygon([
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 }
      ]),
      //левая
      new Polygon([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: -size / 2 }
      ])
    ]

    this.translate(-center.x, -center.y, -center.z)
    this.rotate(60, 0, 0)
  }
}