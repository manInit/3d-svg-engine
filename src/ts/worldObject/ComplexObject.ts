import Transform from '../core/Transform'
import ObjectWorld from './ObjectWorld'

export default abstract class ComplexObject {
  public sides: ObjectWorld[]

  public translate(x: number, y: number, z: number) {
    for (const obj of this.sides) 
      for (let i = 0; i < obj.points.length; i++) 
        obj.points[i] = Transform.translate(obj.points[i], x, y, z)
  }

  public rotate() {
    for (const obj of this.sides) 
      for (let i = 0; i < obj.points.length; i++) 
        obj.points[i] = Transform.rotateY(obj.points[i], 1)
  }
}