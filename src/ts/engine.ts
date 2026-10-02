import ObjectWorld from './core/ObjectWorld'
import Parallelepiped from './ObjectsWorld/Parallelepiped'
import World from './core/World'
import Cube from './ObjectsWorld/Cube'
import Pyramid from './ObjectsWorld/Pyramid'
import Sphere from './ObjectsWorld/Sphere'
import Floor from './ObjectsWorld/Floor'
import Square from './ObjectsWorld/Square'
import Triangle from './ObjectsWorld/Triangle'
import BackgroundElem from './ObjectsWorld/BackgroundElem'
import Camera from './core/Camera'
import type Point from './core/Point'
import Mesh, { type MeshOptions } from './ObjectsWorld/Mesh'
import ParametricSurface, {
  mobiusFunction,
  torusFunction,
  wavesFunction,
  type SurfaceFunction,
  type SurfaceOptions,
} from './ObjectsWorld/ParametricSurface'
import { parseObj } from './utils/obj'
import type { FogOptions, LightOptions } from './core/Lighting'
import type { GlowOptions } from './core/World'

const DEFAULT_FPS = 120

class SVGEngine {
  private world: World
  public player: Camera

  constructor(idWorld: string) {
    const elem = document.getElementById(idWorld)
    if (!elem) throw new Error(`SVGEngine: element with id "${idWorld}" not found`)

    elem.style.overflow = 'hidden'

    this.world = new World(elem)
    this.player = this.world.cameraObj
    this.world.run(DEFAULT_FPS)
  }

  cube = (size: number, x = 0, y = 0, z = 0, color = 'black', texture?: string) =>
    new Cube(size, { x, y, z }, color, texture)
  pyramid = (size: number, x = 0, y = 0, z = 0, color = 'black', texture?: string) =>
    new Pyramid(size, { x, y, z }, color, texture)
  parallelepiped = (
    sizea: number,
    sizeb: number,
    sizec: number,
    x = 0,
    y = 0,
    z = 0,
    color = 'black',
    texture?: string,
  ) => new Parallelepiped(sizea, sizeb, sizec, { x, y, z }, color, texture)
  sphere = (r: number, x = 0, y = 0, z = 0, color = 'black', texture?: string, segments = 10) =>
    new Sphere({ x, y, z }, r, color, texture, segments)
  floor = (size: number, x = 0, y = 0, z = 0, color = 'black', texture?: string) =>
    new Floor(size, { x, y, z }, color, texture)
  square = (size: number, x = 0, y = 0, z = 0, color = 'black', texture?: string) =>
    new Square(size, { x, y, z }, color, texture)
  triangle = (point1: Point, point2: Point, point3: Point, color = 'black', texture?: string) =>
    new Triangle(point1, point2, point3, color, texture)

  torus = (R: number, r: number, x = 0, y = 0, z = 0, color = 'black', segments = 32) =>
    new ParametricSurface(
      torusFunction(R, r),
      { x, y, z },
      {
        color,
        closed: true,
        segmentsU: segments,
        segmentsV: Math.max(3, Math.round(segments / 2)),
      },
    )
  mobius = (R: number, width: number, x = 0, y = 0, z = 0, color = 'black', segments = 48) =>
    new ParametricSurface(mobiusFunction(R, width), { x, y, z }, { color, segmentsU: segments, segmentsV: 4 })
  waves = (size: number, height: number, x = 0, y = 0, z = 0, color = 'black', segments = 24) =>
    new ParametricSurface(wavesFunction(size, height), { x, y, z }, { color, segmentsU: segments, segmentsV: segments })
  surface = (fn: SurfaceFunction, x = 0, y = 0, z = 0, options: SurfaceOptions = {}) =>
    new ParametricSurface(fn, { x, y, z }, options)

  /** модель из текста в формате Wavefront OBJ */
  parseObj = (text: string, x = 0, y = 0, z = 0, options: MeshOptions = {}) =>
    new Mesh(parseObj(text), { x, y, z }, options)
  /** загружает .obj по адресу и возвращает модель (на сцену её нужно добавить через add) */
  loadObj = async (url: string, x = 0, y = 0, z = 0, options: MeshOptions = {}) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`SVGEngine: failed to load "${url}": ${response.status}`)
    return this.parseObj(await response.text(), x, y, z, options)
  }

  setLight = (options: Partial<LightOptions> | null) => this.world.setLight(options)
  setFog = (options: Partial<FogOptions> | null) => this.world.setFog(options)
  setGlow = (options: Partial<GlowOptions> | null = {}) => this.world.setGlow(options)

  setBackground = (urlImage: string) => this.world.setBackground(urlImage)
  addBackgroundElement = (urlImage: string, x = 0, y = 0) => {
    const elem = new BackgroundElem(urlImage, x, y)
    this.world.addBgElem(elem)
    return elem
  }

  /** объекты, добавленные на сцену */
  get objects() {
    return this.world.objectList
  }

  add = (...obj: ObjectWorld[]) => this.world.addObjects(...obj)
  remove = (...obj: ObjectWorld[]) => this.world.removeObjects(...obj)
  update = (cb: (() => void) | null) => this.world.setUpdateFunction(cb)

  start = (fps = DEFAULT_FPS) => this.world.run(fps)
  stop = () => this.world.stop()
  destroy = () => this.world.destroy()

  /** текущий кадр как SVG-строка; background — цвет подложки (по умолчанию цвет тумана) */
  toSVG = (background?: string) => this.world.toSVG(background)

  /** скачивает текущий кадр векторным .svg-файлом */
  saveScreen = (filename = 'scene.svg', background?: string) => {
    const blob = new Blob([this.toSVG(background)], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.download = filename
    a.href = url
    document.body.append(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
}

export type { SVGEngine }

declare global {
  interface Window {
    SVGEngine: (id: string) => SVGEngine
  }
}

window.SVGEngine = (id: string) => new SVGEngine(id)
