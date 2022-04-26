import ObjectWorld from '../core/ObjectWorld'
import Polygon from '../core/Polygon'

export default class Square extends ObjectWorld {
  constructor(size: number) {
    super()
    const points = [
      { x: 0, y: 0, z: 2 }, 
      { x: size, y: 0, z: 2 }, 
      { x: size, y: size, z: 2 }, 
      { x: 0, y: size, z: 2 }
    ]
    this.polygons = [new Polygon(points)]
  }
}