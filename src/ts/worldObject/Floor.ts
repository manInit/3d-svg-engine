import Transform from '../core/Transform'
import ObjectWorld from './ObjectWorld'

export default class Floor {
  public sides: ObjectWorld[]

  constructor(size: number, depth: number, color: string, x: number, y: number, z: number) {
    this.sides = [
      new ObjectWorld([
        { x: -size, y: -depth, z: -size },
        { x: size, y: -depth, z: -size },
        { x: size, y: -depth, z: size },
        { x: -size, y: -depth, z: size }
      ])
    ]

    for (const obj of this.sides) obj.color = color
    
    this.translate(x, y, z)
  }

  public translate(x: number, y: number, z: number) {
    for (const obj of this.sides) 
      for (let i = 0; i < obj.points.length; i++) 
        obj.points[i] = Transform.translate(obj.points[i], x, y, z)
  }
}