import '../css/main.css'
import Camera from './core/Camera'

import MapWorld from './MapWorld'
import World from './World'
import Cube from './worldObject/Cube'

const cube = new Cube(100)
const camera = Camera.getInstance(window.innerWidth)

const world = new World('world', window.innerWidth, window.innerHeight, cube.sides)
const map = new MapWorld('map', 200, 200, world)

requestAnimationFrame(function update() {
  world.render()
  map.render()

  cube.rotate()
  camera.update()

  requestAnimationFrame(update)
})