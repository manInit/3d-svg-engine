import '../css/main.css'

import Camera from './core/Camera'
import MapWorld from './MapWorld'
import World from './World'
import Cube from './worldObject/Cube'
import Floor from './worldObject/Floor'
import ObjectWorld from './worldObject/ObjectWorld'
import Pyramid from './worldObject/Pyramid'

declare global {
  interface Window { 
    camera: Camera

    mapWorld(w: World): MapWorld
    world(obj: ObjectWorld[]): World
    cube(size: number, color: string): Cube
    floor(): Floor
    pyramid(): Pyramid
  }
}

window.camera = Camera.getInstance(window.innerWidth)

window.cube = (size: number, color: string): Cube => new Cube(size, color, 0, 0, 0)
window.pyramid = (): Pyramid => new Pyramid(300, 'yellow', 300, 0, -100)
window.floor = (): Floor => new Floor(1000, 300, 'blue', -1000, 0, -1000)
window.world = (objects): World => new World('world', window.innerWidth, window.innerHeight, objects)
window.mapWorld = (world: World) => new MapWorld('map', 200, 200, world)
