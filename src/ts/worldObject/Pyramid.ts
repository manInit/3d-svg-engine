import Transform from '../core/Transform'
import ObjectWorld from './ObjectWorld'

export default class Pyramid {
  public sides: ObjectWorld[]

  constructor(size: number, x: number, y: number, z: number) {
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

    this.translate(x, y, z)
  }

  public translate(x: number, y: number, z: number) {
    for (const obj of this.sides) {
      for (let i = 0; i < obj.points.length; i++) {
        obj.points[i] = Transform.translate(obj.points[i], x, y, z)
      }
    }
  }

  public rotate() {
    for (const obj of this.sides) {
      for (let i = 0; i < obj.points.length; i++) {
        obj.points[i] = Transform.rotateY(obj.points[i], 1)
      }
    }
  }
}