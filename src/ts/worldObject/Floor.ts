import ComplexObject from './ComplexObject'
import ObjectWorld from './ObjectWorld'

export default class Floor extends ComplexObject {
  public sides: ObjectWorld[]

  constructor(size: number, color: string, x: number, y: number, z: number) {
    super()
    this.sides = [
      new ObjectWorld([
        { x: -size, y: 0, z: -size },
        { x: size, y: 0, z: -size },
        { x: size, y: 0, z: size },
        { x: -size, y: 0, z: size }
      ])
    ]

    for (const obj of this.sides) obj.color = color
    
    this.translate(x, y, z)
  }
}