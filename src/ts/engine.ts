import '../css/3dengine.css'

import Camera from './core/Camera'
import Point from './core/Point'
import MapWorld from './MapWorld'
import { createSVGElem } from './utils/svgElements'
import World from './World'
import ComplexObject from './worldObject/ComplexObject'
import Cube from './worldObject/Cube'
import Floor from './worldObject/Floor'
import Plane from './worldObject/Plane'
import Pyramid from './worldObject/Pyramid'

declare global {
  interface Window { 
    camera: Camera
    world: World
    map: MapWorld | undefined
    
    add(...objects: [ComplexObject]): void
    showMapWorld(size: number): void
    hideMapWorld(): void

    setBackground(urlImage: string): void

    plane(color: string, ...points: [Point]): Plane
    cube(size: number, color: string, x: number, y: number, z: number): Cube
    floor(size: number, color: string, x: number, y: number, z: number): Floor
    pyramid(size: number, color: string, x: number, y: number, z: number): Pyramid
  }
}


const root = document.createElement('div')
root.id = 'worldElem'

const svg = createSVGElem()
svg.style.display = 'none'
svg.id = 'mapElem'

document.body.prepend(svg)
document.body.prepend(root)

window.camera = Camera.getInstance(window.innerWidth, root.id)
window.world = new World(root.id, window.innerWidth, window.innerHeight, [])


window.setBackground = (urlImage: string): void => window.world.skyBox.updateImage(urlImage)
window.add = (...objects: [ComplexObject]): void => window.world.add(objects)
window.plane = (color: string, ...points: [Point]): Plane => new Plane(color, points)
window.cube = (size: number, color: string, x: number, y: number, z: number): Cube => new Cube(size, color, x, y, z)
window.pyramid = (size: number, color: string, x: number, y: number, z: number): Pyramid => new Pyramid(size, color, x, y, z)
window.floor = (size: number, color: string, x: number, y: number, z: number): Floor => new Floor(size, color, x, y ,z)

window.showMapWorld = (size: number): void => {
  svg.style.display = 'block'
  window.map = new MapWorld(svg.id, size, size, window.world)
}
window.hideMapWorld = (): void => {
  svg.style.display = 'none'
  window.map = undefined
}