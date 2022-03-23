import Point from './Point'
import RenderPipe from './RenderPipe'
import Transform from './Transform'

export default class RenderPipeMap extends RenderPipe  {
  override render(points: Point[]): Point[] { 
    const res: Point[] = []

    for (let point of points) {
      point = Transform.scale(point, 1/4, 1/4, 1/4)
      point = this.transformToAxis2D(point)
      res.push(point)
    }

    return res
  }
}