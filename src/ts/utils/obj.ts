import type Point from '../core/Point'

export interface MeshData {
  vertices: Point[]
  /** каждая грань — индексы вершин (с нуля) в порядке обхода */
  faces: number[][]
}

/**
 * Разбор Wavefront OBJ: берутся вершины `v` и грани `f` (в том числе n-угольники,
 * записи вида `1/2/3`, `1//3` и отрицательные индексы). Остальное игнорируется.
 */
export const parseObj = (text: string): MeshData => {
  const vertices: Point[] = []
  const faces: number[][] = []

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (line.startsWith('v ')) {
      const [x, y, z] = line.slice(2).trim().split(/\s+/).map(Number)
      vertices.push({ x: x || 0, y: y || 0, z: z || 0 })
    } else if (line.startsWith('f ')) {
      const face = line
        .slice(2)
        .trim()
        .split(/\s+/)
        .map((token) => {
          const index = parseInt(token.split('/')[0], 10)
          return index < 0 ? vertices.length + index : index - 1
        })
        .filter((index) => index >= 0 && index < vertices.length)
      if (face.length >= 3) faces.push(face)
    }
  }

  return { vertices, faces }
}
