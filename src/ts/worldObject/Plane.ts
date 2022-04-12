import Point from '../core/Point'
import ComplexObject from './ComplexObject'
import ObjectWorld from './ObjectWorld'

export default class Plane extends ComplexObject  {
  constructor(color: string, points: Point[]) {
    super()
    this.sides = [
      new ObjectWorld(points)
    ]

    for (const obj of this.sides) obj.color = color
  }
}