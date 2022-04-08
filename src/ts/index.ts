import './engine'

//addObject()
//cube()
//pyramid()
//sphere()
//plane()
//addMap()
//removeMap()

const cube = window.cube(200, 'red')
const p = window.pyramid()
const floor = window.floor()
const objects = [...cube.sides, ...p.sides, ...floor.sides]

const camera = window.camera
camera.position = { x: -100, y: 0, z: -200 }

const world = window.world(objects)
const map = window.mapWorld(world)

requestAnimationFrame(function update() {
  world.render()
  map.render()
  camera.update()

  p.rotate()

  requestAnimationFrame(update)
})