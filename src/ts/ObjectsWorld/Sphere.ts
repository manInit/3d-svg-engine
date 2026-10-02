import ObjectWorld from '../core/ObjectWorld'
import type Point from '../core/Point'
import Polygon from '../core/Polygon'

export default class Sphere extends ObjectWorld {
  constructor(centerPoint: Point, radius: number, color = 'black', texture?: string, segments = 10) {
    super()

    const sectorCount = Math.max(3, Math.round(segments))
    const stackCount = Math.max(2, Math.round(segments))
    const sectorStep = (2 * Math.PI) / sectorCount
    const stackStep = Math.PI / stackCount

    const verticies: Point[] = []
    for (let i = 0; i <= stackCount; i++) {
      const stackAngle = Math.PI / 2 - i * stackStep
      const xy = radius * Math.cos(stackAngle)
      const z = radius * Math.sin(stackAngle)
      for (let j = 0; j <= sectorCount; j++) {
        const sectorAngle = j * sectorStep
        const x = xy * Math.cos(sectorAngle)
        const y = xy * Math.sin(sectorAngle)
        verticies.push({ x, y, z })
      }
    }

    for (let i = 0; i < stackCount; i++) {
      let k1 = i * (sectorCount + 1)
      let k2 = k1 + sectorCount + 1
      for (let j = 0; j < sectorCount; ++j, ++k1, ++k2) {
        this.polygons.push(new Polygon([verticies[k1], verticies[k1 + 1], verticies[k2 + 1], verticies[k2]], color))
      }
    }

    this.orientOutward()
    if (texture) this.setTexture(texture)
    this.translate(centerPoint.x, centerPoint.y, centerPoint.z)
  }

  /** @deprecated используйте setPosition */
  public setCenterPoint(x: number, y: number, z: number): void {
    this.setPosition(x, y, z)
  }
}
