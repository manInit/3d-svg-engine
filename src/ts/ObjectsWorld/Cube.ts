import ObjectWorld from '../core/ObjectWorld'
import Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Cube extends ObjectWorld {
  constructor(size: number, center: Point, color = 'black') {
    super()
    this.polygons = [
      //задняя плоскость
      new Polygon([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 },
        { x: -size / 2, y: size / 2, z: -size / 2 }
      ], color),
      //передняя плоскость
      new Polygon([
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 }
      ], color),
      //верхняя
      new Polygon([
        { x: -size / 2, y: size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 }
      ], color),
      //нижняя
      new Polygon([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: -size / 2, y: -size / 2, z: size / 2 }
      ], color),
      // правая
      new Polygon([
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 }
      ], color),
      //левая
      new Polygon([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: -size / 2 }
      ], color)
    ]

    this.translate(-center.x, -center.y, -center.z)
    this.rotate(60, 0, 0)
  }
}