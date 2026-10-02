import ObjectWorld from '../core/ObjectWorld'
import type Point from '../core/Point'
import Polygon from '../core/Polygon'
import type { MeshData } from '../utils/obj'

export interface MeshOptions {
  color?: string
  /** размер самой большой стороны габаритов модели после загрузки; по умолчанию — как в файле */
  size?: number
  /** грани видны с обеих сторон — для моделей с дырами или неаккуратными нормалями */
  doubleSided?: boolean
}

/**
 * Произвольная модель из вершин и граней. Ожидается порядок обхода OBJ:
 * против часовой стрелки, если смотреть на грань снаружи.
 */
export default class Mesh extends ObjectWorld {
  constructor({ vertices, faces }: MeshData, center: Point, options: MeshOptions = {}) {
    super()

    const min = { x: Infinity, y: Infinity, z: Infinity }
    const max = { x: -Infinity, y: -Infinity, z: -Infinity }
    for (const v of vertices) {
      min.x = Math.min(min.x, v.x)
      min.y = Math.min(min.y, v.y)
      min.z = Math.min(min.z, v.z)
      max.x = Math.max(max.x, v.x)
      max.y = Math.max(max.y, v.y)
      max.z = Math.max(max.z, v.z)
    }
    const mid = vertices.length
      ? { x: (min.x + max.x) / 2, y: (min.y + max.y) / 2, z: (min.z + max.z) / 2 }
      : { x: 0, y: 0, z: 0 }
    const extent = vertices.length ? Math.max(max.x - min.x, max.y - min.y, max.z - min.z) : 0
    const k = options.size && extent > 0 ? options.size / extent : 1

    //OBJ — правая система координат, движок — левая (z смотрит от зрителя):
    //отражаем z, и чтобы нормали остались наружу, разворачиваем обход граней
    const points = vertices.map((v) => ({ x: (v.x - mid.x) * k, y: (v.y - mid.y) * k, z: -(v.z - mid.z) * k }))

    const color = options.color ?? 'black'
    for (const face of faces) {
      const polygon = new Polygon(
        face.map((_, j) => points[face[face.length - 1 - j]]),
        color,
      )
      polygon.doubleSided = options.doubleSided ?? false
      this.polygons.push(polygon)
    }

    this.translate(center.x, center.y, center.z)
  }
}
