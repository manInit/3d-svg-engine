import Polygon from './Polygon'
import TransformMatrix from './TranformMatrix'

export default abstract class ObjectWorld {
  polygons: Polygon[]

  public translate(x: number, y: number, z: number) {
    for (const polygon of this.polygons) {
      polygon.points = polygon.points.map(point => TransformMatrix.translate(point, x, y ,z))
    }
  }

  public rotate(ax: number, ay: number, az: number) {
    for (const polygon of this.polygons) {
      polygon.points = polygon.points.map(point => {
        point = TransformMatrix.rotateX(point, ax)
        point = TransformMatrix.rotateX(point, ay)
        point = TransformMatrix.rotateX(point, az)
        return point
      })
    }
  }
}