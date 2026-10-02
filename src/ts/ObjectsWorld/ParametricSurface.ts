import ObjectWorld from '../core/ObjectWorld'
import type Point from '../core/Point'
import Polygon from '../core/Polygon'
import TransformMatrix from '../core/TransformMatrix'

/** Функция поверхности: u, v пробегают свои диапазоны, t — произвольный параметр анимации. */
export type SurfaceFunction = (u: number, v: number, t: number) => Point

export interface SurfaceOptions {
  /** количество сегментов по u и по v */
  segmentsU?: number
  segmentsV?: number
  /** диапазоны параметров, по умолчанию [0, 1] */
  rangeU?: [number, number]
  rangeV?: [number, number]
  color?: string
  /**
   * true — поверхность замкнута и порядок обхода даёт нормали наружу,
   * тогда невидимые грани отсекаются. По умолчанию грани двусторонние.
   */
  closed?: boolean
}

/**
 * Параметрическая поверхность — сетка четырёхугольников по функции f(u, v, t).
 * Вызов setTime(t) пересчитывает вершины, так что поверхность можно анимировать
 * (волны, «дышащие» фигуры), сохраняя при этом сделанные rotate/translate.
 */
export default class ParametricSurface extends ObjectWorld {
  private fn: SurfaceFunction
  private segU: number
  private segV: number
  private rangeU: [number, number]
  private rangeV: [number, number]
  //ориентация фигуры: куда смотрят локальные оси x, y, z
  private basis: [Point, Point, Point] = [
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: 0, z: 1 },
  ]
  private time = 0

  constructor(fn: SurfaceFunction, center: Point, options: SurfaceOptions = {}) {
    super()
    this.fn = fn
    this.segU = Math.max(1, Math.round(options.segmentsU ?? 24))
    this.segV = Math.max(1, Math.round(options.segmentsV ?? 24))
    this.rangeU = options.rangeU ?? [0, 1]
    this.rangeV = options.rangeV ?? [0, 1]

    const color = options.color ?? 'black'
    for (let i = 0; i < this.segU * this.segV; i++) {
      const polygon = new Polygon([], color)
      polygon.doubleSided = !options.closed
      this.polygons.push(polygon)
    }

    this.center = { ...center }
    this.rebuild()
  }

  get t(): number {
    return this.time
  }

  public setTime(t: number): void {
    this.time = t
    this.rebuild()
  }

  public setFunction(fn: SurfaceFunction): void {
    this.fn = fn
    this.rebuild()
  }

  public override rotate(ax: number, ay: number, az: number): void {
    super.rotate(ax, ay, az)
    //тот же поворот, что у вершин, применяем к осям, чтобы он пережил пересчёт сетки
    this.basis = this.basis.map((axis) =>
      TransformMatrix.rotateZ(TransformMatrix.rotateY(TransformMatrix.rotateX(axis, ax), ay), az),
    ) as [Point, Point, Point]
  }

  private rebuild(): void {
    const [u0, u1] = this.rangeU
    const [v0, v1] = this.rangeV
    const [bx, by, bz] = this.basis
    const { x: cx, y: cy, z: cz } = this.center

    const grid: Point[] = []
    for (let i = 0; i <= this.segU; i++) {
      const u = u0 + ((u1 - u0) * i) / this.segU
      for (let j = 0; j <= this.segV; j++) {
        const v = v0 + ((v1 - v0) * j) / this.segV
        const p = this.fn(u, v, this.time)
        grid.push({
          x: cx + p.x * bx.x + p.y * by.x + p.z * bz.x,
          y: cy + p.x * bx.y + p.y * by.y + p.z * bz.y,
          z: cz + p.x * bx.z + p.y * by.z + p.z * bz.z,
        })
      }
    }

    const row = this.segV + 1
    let index = 0
    for (let i = 0; i < this.segU; i++) {
      for (let j = 0; j < this.segV; j++) {
        const k = i * row + j
        this.polygons[index++].points = [grid[k], grid[k + row], grid[k + row + 1], grid[k + 1]]
      }
    }
  }
}

const TAU = Math.PI * 2

/** Тор с нормалями наружу: R — радиус до центра трубки, r — радиус трубки. */
export const torusFunction =
  (R: number, r: number): SurfaceFunction =>
  (u, v) => ({
    x: (R + r * Math.cos(v * TAU)) * Math.cos(u * TAU),
    y: r * Math.sin(v * TAU),
    //минус задаёт порядок обхода, при котором нормали смотрят наружу
    z: -(R + r * Math.cos(v * TAU)) * Math.sin(u * TAU),
  })

/** Лента Мёбиуса радиуса R и ширины width. */
export const mobiusFunction =
  (R: number, width: number): SurfaceFunction =>
  (u, v) => {
    const a = u * TAU
    const s = (v - 0.5) * width
    return {
      x: (R + s * Math.cos(a / 2)) * Math.cos(a),
      y: s * Math.sin(a / 2),
      z: (R + s * Math.cos(a / 2)) * Math.sin(a),
    }
  }

/** Волнующаяся водная гладь размером size × size. */
export const wavesFunction =
  (size: number, height: number): SurfaceFunction =>
  (u, v, t) => {
    const x = (u - 0.5) * size
    const z = (v - 0.5) * size
    const y =
      height *
      (Math.sin(x * 0.12 + t * 1.3) * 0.6 +
        Math.sin(z * 0.17 - t * 0.9) * 0.4 +
        Math.sin((x + z) * 0.07 + t * 0.7) * 0.5)
    return { x, y, z }
  }
