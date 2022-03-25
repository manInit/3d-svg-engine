import '../css/main.css'
import Camera from './core/Camera'

import MapWorld from './MapWorld'
import World from './World'
import Cube from './worldObject/Cube'
import Pyramid from './worldObject/Pyramid'

const cube = new Cube(100, 0, 0, 0)
const p = new Pyramid(100, 0, 0, 200)
const p1 = new Pyramid(300, 300, 0, -100)
const p2 = new Pyramid(250, -1000, 0, 350)
const camera = Camera.getInstance(window.innerWidth)
camera.position = {x:-100, y:0, z:-200}

const objects = [...cube.sides, ...p.sides, ...p1.sides, ...p2.sides]

const world = new World('world', window.innerWidth, window.innerHeight, objects)
const map = new MapWorld('map', 200, 200, world)

requestAnimationFrame(function update() {
  world.render()
  map.render()

  cube.rotate()
  camera.update()
  p.rotate()

  requestAnimationFrame(update)
})