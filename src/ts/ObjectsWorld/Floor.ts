import ObjectWorld from '../core/ObjectWorld'
import Point from '../core/Point'
import Polygon from '../core/Polygon'
import TransformMatrix from '../core/TranformMatrix'

export default class Floor extends ObjectWorld {
  constructor(size: number, center: Point, color = 'black', texture?: string) {
    super()
    this.polygons = []
    let verticies: Point[] = []
    let stepLines = 10
    let stepColumn = 10
    let lines = size / stepLines 
    let columns = size / stepColumn
    for (let i = 0; i <= lines; i++) {
      for (let j = 0; j <= columns; j++) {
        let point = {x: 0, y: 0, z: -size / 2}
        point.x = j * stepLines
        point.z = i * stepColumn
        point = TransformMatrix.translate(point, -size / 2, 0, -size / 2)
        verticies.push(point)
      }
    }
    console.log(verticies)
    for (let i = 0; i < lines; i++) {
      let k1 = i * (columns + 1)
      let k2 = k1 + columns + 1
      for (let j = 0; j < columns; j++, k1++, k2++) {
        this.polygons.push(new Polygon([
          verticies[k1],
          verticies[k1 + 1],
          verticies[k2 + 1],
          verticies[k2]
        ], color))
      }
    }

    if (texture) {
      for (const p of this.polygons) p.setTexture(texture)
    }
    this.translate(center.x, center.y, center.z)
  }
}