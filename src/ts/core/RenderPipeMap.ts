import Point from './Point'
import RenderPipe from './RenderPipe'
import Transform from './Transform'

export default class RenderPipeMap extends RenderPipe  {
  override render(points: Point[]): Point[] { 
    const res: Point[] = []

    for (let point of points) {
      point = Transform.scale(point, 1/10, 1/10, 1/10)
      point = this.transformToAxis2D(point)
      res.push(point)
    }

    return res
  }
}