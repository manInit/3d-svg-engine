import type Point from '../core/Point'

const sub = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z })

const dot = (a: Point, b: Point): number => a.x * b.x + a.y * b.y + a.z * b.z

const cross = (a: Point, b: Point): Point => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
})

const length = (a: Point): number => Math.sqrt(dot(a, a))

const normalize = (a: Point): Point => {
  const len = length(a)
  return len === 0 ? { x: 0, y: 0, z: 0 } : { x: a.x / len, y: a.y / len, z: a.z / len }
}

const centroid = (points: Point[]): Point => {
  const c = { x: 0, y: 0, z: 0 }
  for (const p of points) {
    c.x += p.x
    c.y += p.y
    c.z += p.z
  }
  const n = points.length || 1
  return { x: c.x / n, y: c.y / n, z: c.z / n }
}

//нормаль многоугольника методом Ньюэлла: устойчива к вырожденным вершинам (полюса сферы)
const polygonNormal = (points: Point[]): Point => {
  const n = { x: 0, y: 0, z: 0 }
  for (let i = 0; i < points.length; i++) {
    const a = points[i]
    const b = points[(i + 1) % points.length]
    n.x += (a.y - b.y) * (a.z + b.z)
    n.y += (a.z - b.z) * (a.x + b.x)
    n.z += (a.x - b.x) * (a.y + b.y)
  }
  return n
}

export { sub, dot, cross, length, normalize, centroid, polygonNormal }
