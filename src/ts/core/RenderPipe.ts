import type Point from './Point'
import TransformMatrix from './TransformMatrix'

export interface CameraState {
  position: Point
  rotation: { ax: number; ay: number; az: number }
}

export default class RenderPipe {
  private width: number
  private height: number
  private z0: number
  private zNear: number
  private zFar: number
  private camera: CameraState

  constructor(width: number, height: number, z0: number, zFar: number, camera: CameraState, zNear = 0.1) {
    this.width = width
    this.height = height

    this.z0 = z0
    this.zNear = zNear
    this.zFar = zFar
    this.camera = camera
  }

  public setViewport(width: number, height: number, z0: number): void {
    this.width = width
    this.height = height
    this.z0 = z0
  }

  /**
   * Переводит точки полигона в экранные координаты.
   * Полигон обрезается по ближней и дальней плоскостям; если от него ничего
   * не осталось, возвращается пустой массив и averageDistance = Infinity.
   */
  public convertPoints(points: Point[]): { points: Point[]; averageDistance: number } {
    let viewPoints = points.map((point) => this.cameraRotate(this.cameraTranslate(point)))

    viewPoints = RenderPipe.clipZ(viewPoints, this.zNear, true)
    viewPoints = RenderPipe.clipZ(viewPoints, this.zFar, false)

    if (viewPoints.length === 0) return { points: [], averageDistance: Infinity }

    let sumDistance = 0
    const resPoints = viewPoints.map((point) => {
      sumDistance += Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2)

      point = TransformMatrix.perspectiveProjection(point, this.z0)
      point = TransformMatrix.scale(point, 1, -1, 1)
      return TransformMatrix.translate(point, this.width / 2, this.height / 2, 0)
    })

    return { points: resPoints, averageDistance: sumDistance / resPoints.length }
  }

  //отсечение полигона плоскостью z = zPlane (алгоритм Сазерленда — Ходжмана)
  public static clipZ(points: Point[], zPlane: number, keepFront: boolean): Point[] {
    const inside = (p: Point) => (keepFront ? p.z >= zPlane : p.z <= zPlane)
    const result: Point[] = []

    for (let i = 0; i < points.length; i++) {
      const current = points[i]
      const prev = points[(i + points.length - 1) % points.length]
      const currentIn = inside(current)
      const prevIn = inside(prev)

      if (currentIn !== prevIn) {
        const t = (zPlane - prev.z) / (current.z - prev.z)
        result.push({
          x: prev.x + (current.x - prev.x) * t,
          y: prev.y + (current.y - prev.y) * t,
          z: zPlane,
        })
      }
      if (currentIn) result.push(current)
    }

    return result
  }

  private cameraTranslate(point: Point): Point {
    const { x, y, z } = this.camera.position
    return TransformMatrix.translate(point, -x, -y, -z)
  }

  //рыскание (ay), затем тангаж (az), затем крен (ax)
  private cameraRotate(point: Point): Point {
    point = TransformMatrix.rotateY(point, this.camera.rotation.ay)
    point = TransformMatrix.rotateX(point, this.camera.rotation.az)
    return TransformMatrix.rotateZ(point, this.camera.rotation.ax)
  }
}
