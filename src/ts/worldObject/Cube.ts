import Transform from '../core/Transform'
import ObjectWorld from './ObjectWorld'

export default class Cube {
  public sides: ObjectWorld[]

  constructor(size: number) {
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
  }

  public rotate() {
    for (const obj of this.sides) {
      for (let i = 0; i < obj.points.length; i++) {
        obj.points[i] = Transform.rotateY(obj.points[i], 1)
      }
    }
  }
}