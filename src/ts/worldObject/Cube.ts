import ComplexObject from './ComplexObject'
import ObjectWorld from './ObjectWorld'

export default class Cube extends ComplexObject {
  constructor(size: number, color: string, x: number, y: number, z: number) {
    super()
    this.sides = [
      //задняя плоскость
      new ObjectWorld([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: -size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 },
        { x: -size / 2, y: size / 2, z: -size / 2 }
      ]),
      //передняя плоскость
      new ObjectWorld([
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: -size / 2, z: size / 2 },
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 }
      ]),
      //верхняя
      new ObjectWorld([
        { x: -size / 2, y: size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 },
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 }
      ]),
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
        { x: size / 2, y: size / 2, z: size / 2 },
        { x: size / 2, y: size / 2, z: -size / 2 }
      ]),
      //левая
      new ObjectWorld([
        { x: -size / 2, y: -size / 2, z: -size / 2 },
        { x: -size / 2, y: -size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: size / 2 },
        { x: -size / 2, y: size / 2, z: -size / 2 }
      ])
    ]
    
    for (const obj of this.sides) obj.color = color
    this.translate(x, y, z)
  }
}