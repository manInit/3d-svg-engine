import Camera from './Camera'
import Point from './Point'
import TransformMatrix from './TranformMatrix'

export default class RenderPipe {
  private width: number 
  private height: number
  private z0: number
  private zFar: number
  private camera: Camera

  constructor(width: number, height: number, z0: number, zFar: number, camera: Camera) {
    this.width = width
    this.height = height

    this.z0 = z0
    this.zFar = zFar
    this.camera = camera
  }

  public convertPoints(points: Point[]): { points: Point[], averageDistance: number } {
    const resPoints: Point[] = []

    let sumDistance = 0
    for (let point of points) {
      point = this.cameraTranslate(point)
      point = this.cameraRotate(point)

      //передняя и дальняя плоскость отсечения
      if (point.z < 0) continue
      if (point.z > this.zFar) continue

      sumDistance += Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2)

      point = TransformMatrix.perspectiveProjection(point, this.z0)
      point = TransformMatrix.scale(point, 1, -1, 1)
      point = TransformMatrix.translate(point, this.width / 2, this.height / 2, 0)

      resPoints.push(point)
    }
    const averageDistance = sumDistance / resPoints.length

    return { points: resPoints, averageDistance }
  }

  private cameraTranslate(point: Point): Point {
    return TransformMatrix.translate(point, -this.camera.position.x, -this.camera.position.y, -this.camera.position.z)
  }

  private cameraRotate(point: Point): Point {
    point = TransformMatrix.rotateX(point, this.camera.rotation.ax)
    point = TransformMatrix.rotateY(point, this.camera.rotation.ay)
    return TransformMatrix.rotateX(point, this.camera.rotation.az)
  }
}