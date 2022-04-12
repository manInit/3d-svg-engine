import ComplexObject from './ComplexObject'
import ObjectWorld from './ObjectWorld'

export default class Pyramid extends ComplexObject {
  constructor(size: number, color: string, x: number, y: number, z: number) {
    super()
    this.sides = [
      //нижняя
      new ObjectWorld([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: -size / 2, y: -size / 2, z: size / 2 }
      ]),

      // правая
      new ObjectWorld([
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: 0, y: size / 2, z: 0 },
      ]),
      //левая
      new ObjectWorld([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: 0, y: size / 2, z: 0 },
      ]),

      //передняя
      new ObjectWorld([
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: 0, y: size / 2, z: 0 },
      ]),

      //задняя
      new ObjectWorld([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: 0, y: size / 2, z: 0 },
      ]),
    ]

    for (const obj of this.sides) obj.color = color
    
    this.translate(x, y, z)
  }
}