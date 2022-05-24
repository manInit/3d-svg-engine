import ObjectWorld from './core/ObjectWorld'
import Parallelepiped from './ObjectsWorld/Parallelepiped'
import World from './core/World'
import Cube from './ObjectsWorld/Cube'
import Pyramid from './ObjectsWorld/Pyramid'
import Sphere from './ObjectsWorld/Sphere'
import Floor from './ObjectsWorld/Floor'
import Camera from './core/Camera'

class SVGEngine {
  private world: World
  public player: Camera

  constructor(idWorld: string) {
    const elem = document.getElementById(idWorld)
    elem.style.overflow = 'hidden'
    elem.style.backgroundRepeat = 'repeat-x'
    elem.style.backgroundSize = 'cover'

    this.world = new World(elem)
    this.player = this.world.cameraObj
    this.world.run(120)
  }

  cube = (size: number, x = 0, y = 0, z = 0, color = 'black') => new Cube(size, {x, y, z}, color)
  pyramid = (size: number, x = 0, y = 0, z = 0, color = 'black') => new Pyramid(size, {x, y, z}, color)
  parallelepiped = (sizea: number, sizeb: number, sizec: number, x = 0, y = 0, z = 0, color = 'black') => new Parallelepiped(sizea, sizeb, sizec, {x, y, z}, color)
  sphere = (r: number, x = 0, y = 0, z = 0, color = 'black') => new Sphere({x, y, z}, r, color)
  floor = (size: number, x = 0, y = 0, z = 0, color = 'black') => new Floor(size, {x, y, z}, color)

  setBackground = (urlImage: string) => this.world.setBackground(urlImage)
  add = (...obj: ObjectWorld[]) => this.world.addObjects(...obj)
  update = (cb: () => void) => this.world.setUpdateFunction(cb)
  
  saveScreen = () => {
    const svgRoot = this.world.svgRootElement
    const serializer = new XMLSerializer()
  
    let source = serializer.serializeToString(svgRoot)
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source
    
    const url = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(source)
    const a = document.createElement('a')
    const e = new MouseEvent('click')
  
    a.download = 'download.svg'
    a.href = url
    a.dispatchEvent(e)
  }
}

declare global {
  interface Window { 
    SVGEngine: (id: string) => SVGEngine
  }
}

window.SVGEngine = (id: string) => new SVGEngine(id)