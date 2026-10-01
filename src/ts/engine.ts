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
  sphere = (r: number, x = 0, y = 0, z = 0, color = 'black', texture?: string) =>
    new Sphere({ x, y, z }, r, color, texture)
  floor = (size: number, x = 0, y = 0, z = 0, color = 'black', texture?: string) =>
    new Floor(size, { x, y, z }, color, texture)
  square = (size: number, x = 0, y = 0, z = 0, color = 'black', texture?: string) =>
    new Square(size, { x, y, z }, color, texture)
  triangle = (point1: Point, point2: Point, point3: Point, color = 'black', texture?: string) =>
    new Triangle(point1, point2, point3, color, texture)

  setBackground = (urlImage: string) => this.world.setBackground(urlImage)
  addBackgroundElement = (urlImage: string, x = 0, y = 0) => {
    const elem = new BackgroundElem(urlImage, x, y)
    this.world.addBgElem(elem)
    return elem
  }

  add = (...obj: ObjectWorld[]) => this.world.addObjects(...obj)
  remove = (...obj: ObjectWorld[]) => this.world.removeObjects(...obj)
  update = (cb: (() => void) | null) => this.world.setUpdateFunction(cb)

  start = (fps = DEFAULT_FPS) => this.world.run(fps)
  stop = () => this.world.stop()
  destroy = () => this.world.destroy()

  saveScreen = () => {
    const svgRoot = this.world.svgRootElement
    const serializer = new XMLSerializer()

    let source = serializer.serializeToString(svgRoot)
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source

    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
    const a = document.createElement('a')

    a.download = 'download.svg'
    a.href = url
    a.dispatchEvent(new MouseEvent('click'))
  }
}

declare global {
  interface Window {
    SVGEngine: (id: string) => SVGEngine
  }
}

window.SVGEngine = (id: string) => new SVGEngine(id)
