import Camera from './Camera'
import Point from './Point'
import Transform from './Transform'

export default class RenderPipe {
  protected camera: Camera

  private width: number
  private height: number
  
  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.camera = Camera.getInstance()
  }

  public render(points: Point[]): Point[] { 
    const res: Point[] = []

    let averageDistance = 0
    let sumDistance = 0
    let count = 0

    for (let point of points) {
      point = this.cameraTranslate(point)
      point = this.cameraRotate(point)

      //передняя и дальняя плоскость отсечения
      if (point.z < 0) continue
      if (point.z > this.camera.zFar) continue

      sumDistance += Math.sqrt(point.x**2+point.y**2+point.z**2)
      count++

      point = Transform.perspective(point)
      point = this.transformToAxis2D(point)
      res.push(point)
    }

    averageDistance = sumDistance / count
    for (let point of res) {
      point.z = 1 / averageDistance * 100000
    }

    return res
  }
  
  public cameraTranslate(point: Point): Point {
    return Transform.translate(point, -this.camera.position.x, -this.camera.position.y, -this.camera.position.z)
  }

  public cameraRotate(point: Point): Point {
    point = Transform.rotateX(point, this.camera.rotation.ax)
    point = Transform.rotateY(point, this.camera.rotation.ay)
    return Transform.rotateX(point, this.camera.rotation.az)
  }

  public transformToAxis2D(point: Point): Point {
    point = Transform.scale(point, 1, -1, 1)
    point = Transform.translate(point, this.width / 2, this.height / 2, 0)
    return point
  }
}