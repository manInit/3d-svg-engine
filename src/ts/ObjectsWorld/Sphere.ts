import ObjectWorld from '../core/ObjectWorld'
import Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Sphere extends ObjectWorld {
  private centerPoint: Point

  constructor(centerPoint: Point, radius: number, color = 'black', texture?: string) {
    super()
    this.polygons = []
    this.centerPoint = centerPoint

    const sectorCount = 10
    const stackCount = 10
    const sectorStep = 2 * Math.PI / sectorCount;
    const stackStep = Math.PI / stackCount;

    const verticies: Point[] = []
    for (let i = 0; i <= stackCount; i++) {
      let stackAngle = Math.PI / 2 - i * stackStep
      let xy = radius * Math.cos(stackAngle)
      let z = radius * Math.sin(stackAngle)
      for (let j = 0; j <= sectorCount; j++) {
        let sectorAngle = j * sectorStep
        let x = xy * Math.cos(sectorAngle)
        let y = xy * Math.sin(sectorAngle)
        verticies.push({x, y, z})
      }
    }

    for (let i = 0; i < stackCount; i++) {
      let k1 = i * (sectorCount + 1)
      let k2 = k1 + sectorCount + 1
      for (let j = 0; j < sectorCount; ++j, ++k1, ++k2) {
        this.polygons.push(new Polygon([
          verticies[k1],
          verticies[k1 + 1],
          verticies[k2 + 1],
          verticies[k2]
        ], color))
      }
    }

    if (texture) {
      for (const p of this.polygons) p.setTexture(texture)
    }

    this.translate(centerPoint.x, centerPoint.y, centerPoint.z)
  }

  
  public setCenterPoint(x: number, y: number, z: number) {
    this.translate(-this.centerPoint.x, -this.centerPoint.y, -this.centerPoint.z)
    this.translate(x, y, z)
    this.centerPoint = {x, y, z}
  }
}