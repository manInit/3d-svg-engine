import type Point from './Point'
import Polygon from './Polygon'
import TransformMatrix from './TransformMatrix'
import { centroid, dot, polygonNormal, sub } from '../utils/vector'

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

  public setTexture(url: string): this {
    for (const polygon of this.polygons) polygon.setTexture(url)
    return this
  }

  public setColor(color: string): this {
    for (const polygon of this.polygons) polygon.fillColor = color
    return this
  }

  /** обводка граней; null — убрать обводку */
  public setStroke(color: string | null, width = 1): this {
    for (const polygon of this.polygons) polygon.setStroke(color, width)
    return this
  }

  /** false — фигура не реагирует на освещение (удобно для «неоновых» объектов) */
  public setShading(enabled: boolean): this {
    for (const polygon of this.polygons) polygon.shaded = enabled
    return this
  }

  /** true — грани видны с обеих сторон (для незамкнутых поверхностей) */
  public setDoubleSided(enabled: boolean): this {
    for (const polygon of this.polygons) polygon.doubleSided = enabled
    return this
  }

  //для выпуклых замкнутых фигур: разворачиваем нормали всех граней наружу от центра
  protected orientOutward(): void {
    for (const polygon of this.polygons) {
      const outward = sub(centroid(polygon.points), this.center)
      if (dot(polygonNormal(polygon.points), outward) < 0) polygon.flip()
    }
  }

  protected mapPoints(fn: (point: Point) => Point): void {
    for (const polygon of this.polygons) {
      polygon.points = polygon.points.map(fn)
    }
  }
}
