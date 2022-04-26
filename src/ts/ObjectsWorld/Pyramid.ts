import ObjectWorld from '../core/ObjectWorld'
import Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Pyramid extends ObjectWorld {
  constructor(size: number, center: Point, color = 'black') {
    super()
    this.polygons = [
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
        { x: 0, y: size / 2, z: 0 },
      ], color),
      //левая
      new Polygon([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: 0, y: size / 2, z: 0 },
      ], color),
      //передняя
      new Polygon([
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: 0, y: size / 2, z: 0 },
      ], color),
      //задняя
      new Polygon([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: 0, y: size / 2, z: 0 },
      ], color),
    ]

    this.translate(center.x, center.y, center.z)
  }
}