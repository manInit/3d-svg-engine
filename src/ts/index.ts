import '../css/main.css'

import Camera from './core/Camera'
import MapWorld from './MapWorld'
import World from './World'
import Cube from './worldObject/Cube'
import Floor from './worldObject/Floor'
import Pyramid from './worldObject/Pyramid'

const cube = new Cube(100, 'black', 0, 0, 0)
const p = new Pyramid(100, 'red', 0, 0, 200)
const p1 = new Pyramid(300, 'yellow', 300, 0, -100)
const p2 = new Pyramid(250, 'green', -1000, 0, 350)
const floor = new Floor(1000, 300, 'blue', -1000, 0, -1000)
const objects = [...cube.sides, ...p.sides, ...p1.sides, ...p2.sides, ...floor.sides]

const camera = Camera.getInstance(window.innerWidth)
camera.position = {x: -100, y: 0, z: -200}

const world = new World('world', window.innerWidth, window.innerHeight, objects)
const map = new MapWorld('map', 200, 200, world)

requestAnimationFrame(function update() {
  world.render()
  map.render()
  camera.update()

  p.rotate()

  requestAnimationFrame(update)
})