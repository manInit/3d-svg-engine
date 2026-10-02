import ObjectWorld from '../core/ObjectWorld'
import type Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Floor extends ObjectWorld {
  //примерный размер одной клетки пола
  private static cellSize = 10

  constructor(size: number, center: Point, color = 'black', texture?: string) {
    super()

    //количество клеток должно быть целым, иначе индексы вершин съезжают
    const cells = Math.max(1, Math.round(size / Floor.cellSize))
    const step = size / cells

    const verticies: Point[] = []
    for (let i = 0; i <= cells; i++) {
      for (let j = 0; j <= cells; j++) {
        verticies.push({ x: j * step - size / 2, y: 0, z: i * step - size / 2 })
      }
    }

    for (let i = 0; i < cells; i++) {
      let k1 = i * (cells + 1)
      let k2 = k1 + cells + 1
      for (let j = 0; j < cells; j++, k1++, k2++) {
        this.polygons.push(new Polygon([verticies[k1], verticies[k1 + 1], verticies[k2 + 1], verticies[k2]], color))
      }
    }

    this.setDoubleSided(true)
    if (texture) this.setTexture(texture)
    this.translate(center.x, center.y, center.z)
  }
}
