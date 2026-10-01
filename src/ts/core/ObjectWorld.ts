import type Point from './Point'
import Polygon from './Polygon'
import TransformMatrix from './TransformMatrix'

export default abstract class ObjectWorld {
  public polygons: Polygon[] = []
  protected center: Point = { x: 0, y: 0, z: 0 }

  get position(): Point {
    return { ...this.center }
  }

  public translate(x: number, y: number, z: number): void {
    this.mapPoints((point) => TransformMatrix.translate(point, x, y, z))
    this.center = TransformMatrix.translate(this.center, x, y, z)
  }

  public setPosition(x: number, y: number, z: number): void {
    this.translate(x - this.center.x, y - this.center.y, z - this.center.z)
  }

  //поворот вокруг центра фигуры
  public rotate(ax: number, ay: number, az: number): void {
    const { x, y, z } = this.center
    this.mapPoints((point) => {
      point = TransformMatrix.translate(point, -x, -y, -z)
      point = TransformMatrix.rotateX(point, ax)
      point = TransformMatrix.rotateY(point, ay)
      point = TransformMatrix.rotateZ(point, az)
      return TransformMatrix.translate(point, x, y, z)
    })
  }

  public setTexture(url: string): void {
    for (const polygon of this.polygons) polygon.setTexture(url)
  }

  protected mapPoints(fn: (point: Point) => Point): void {
    for (const polygon of this.polygons) {
      polygon.points = polygon.points.map(fn)
    }
  }
}
