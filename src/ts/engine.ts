import '../css/3dengine.css'
import ObjectWorld from './core/ObjectWorld'
import Parallelepiped from './ObjectsWorld/Parallelepiped'
import World from './core/World'
import Cube from './ObjectsWorld/Cube'
import Pyramid from './ObjectsWorld/Pyramid'
import Sphere from './ObjectsWorld/Sphere'
import Floor from './ObjectsWorld/Floor'
import Camera from './core/Camera'
import Square from './ObjectsWorld/Square'

declare global {
  interface Window { 
    player: Camera

    cube: (size: number, x: number, y: number, z: number, color: string) => Cube
    pyramid: (size: number, x: number, y: number, z: number, color: string) => Pyramid
    parallelepiped: (sizea: number, sizeb: number, sizec: number, x: number, y: number, z: number, color: string) => Parallelepiped
    sphere: (r: number, x: number, y: number, z: number, color: string) => Sphere
    
    add: (...obj: ObjectWorld[]) => void
    update: (cb: () => void) => void
    setBackground: (urlImage: string) => void
    saveScreen: () => void
    
    floor: (size: number, x: number, y: number, z: number, color: string) => Floor
    square: (size: number, x: number, y: number, z: number, color: string) => Square
  }
}

let rootElem = document.getElementById('world')
if (!rootElem) {
  rootElem = document.createElement('div')
  rootElem.id = 'world'
  document.body.prepend(rootElem)
}
const world = new World(rootElem)

window.cube = (size: number, x = 0, y = 0, z = 0, color = 'black') => new Cube(size, {x, y, z}, color)
window.pyramid = (size: number, x = 0, y = 0, z = 0, color = 'black') => new Pyramid(size, {x, y, z}, color)
window.parallelepiped = (sizea: number, sizeb: number, sizec: number, x = 0, y = 0, z = 0, color = 'black') => new Parallelepiped(sizea, sizeb, sizec, {x, y, z}, color)
window.sphere = (r: number, x = 0, y = 0, z = 0, color = 'black') => new Sphere({x, y, z}, r, color)
window.floor = (size: number, x = 0, y = 0, z = 0, color = 'black') => new Floor(size, {x, y, z}, color)

window.setBackground = (urlImage: string) => world.setBackground(urlImage)
window.add = (...obj: ObjectWorld[]) => world.addObjects(...obj)
window.update = (cb: () => void) => world.setUpdateFunction(cb)
window.player = world.cameraObj

window.saveScreen = () => {
  const svgRoot = world.svgRootElement
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

world.run(120)


