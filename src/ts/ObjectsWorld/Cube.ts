import ObjectWorld from '../core/ObjectWorld'
import type Point from '../core/Point'
import Parallelepiped from './Parallelepiped'

export default class Cube extends ObjectWorld {
  constructor(size: number, center: Point, color = 'black', texture?: string) {
    super()
    this.polygons = new Parallelepiped(size, size, size, { x: 0, y: 0, z: 0 }, color).polygons

    if (texture) this.setTexture(texture)
    this.translate(center.x, center.y, center.z)
  }
}
