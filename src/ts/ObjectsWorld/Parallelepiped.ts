import ObjectWorld from '../core/ObjectWorld'
import Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Parallelepiped extends ObjectWorld {
  constructor(sizea: number, sizeb: number, sizec: number, center: Point, color = 'black', texture?: string) {
    super()
    this.polygons = [
      //задняя плоскость
      new Polygon([
        { x: -sizec / 2, y: -sizeb / 2, z: -sizea / 2 },
        { x: sizec / 2, y: -sizeb / 2, z: -sizea / 2 },
        { x: sizec / 2, y: sizeb / 2, z: -sizea / 2 },
        { x: -sizec / 2, y: sizeb / 2, z: -sizea / 2 }
      ], color),
      //передняя плоскость
      new Polygon([
        { x: -sizec / 2, y: -sizeb / 2, z: sizea / 2 },
        { x: sizec / 2, y: -sizeb / 2, z: sizea / 2 },
        { x: sizec / 2, y: sizeb / 2, z: sizea / 2 },
        { x: -sizec / 2, y: sizeb / 2, z: sizea / 2 }
      ], color),
      //верхняя
      new Polygon([
        { x: -sizec / 2, y: sizeb / 2, z: -sizea / 2 },
        { x: sizec / 2, y: sizeb / 2, z: -sizea / 2 },
        { x: sizec / 2, y: sizeb / 2, z: sizea / 2 },
        { x: -sizec / 2, y: sizeb / 2, z: sizea / 2 }
      ], color),
      //нижняя
      new Polygon([
        { x: -sizec / 2, y: -sizeb / 2, z: -sizea / 2 },
        { x: sizec / 2, y: -sizeb / 2, z: -sizea / 2 },
        { x: sizec / 2, y: -sizeb / 2, z: sizea / 2 },
        { x: -sizec / 2, y: -sizeb / 2, z: sizea / 2 }
      ], color),
      // правая
      new Polygon([
        { x: sizec / 2, y: -sizeb / 2, z: -sizea / 2 },
        { x: sizec / 2, y: -sizeb / 2, z: sizea / 2 },
        { x: sizec / 2, y: sizeb / 2, z: sizea / 2 },
        { x: sizec / 2, y: sizeb / 2, z: -sizea / 2 }
      ], color),
      //левая
      new Polygon([
        { x: -sizec / 2, y: -sizeb / 2, z: -sizea / 2 },
        { x: -sizec / 2, y: -sizeb / 2, z: sizea / 2 },
        { x: -sizec / 2, y: sizeb / 2, z: sizea / 2 },
        { x: -sizec / 2, y: sizeb / 2, z: -sizea / 2 }
      ], color)
    ]

    if (texture) {
      for (const p of this.polygons) p.setTexture(texture)
    }
    this.translate(center.x, center.y, center.z)
  }
}