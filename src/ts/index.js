import './engine.ts'

const sphere1 = sphere(10, 100, 100, 0)
const pyramid1 = pyramid(10, 0, 0, 0)
const cube1 = cube(10, 100, 100, 100)
const x = parallelepiped(100, 30, 30, 30, 100, 200)
add(sphere1, cube1, x, pyramid1, floor1)

update(() => {
  cube1.rotate(1, 0, 0)
})
// const world = new World(document.getElementById('world'))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 200, 100))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 400, 100))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 600, 300))

// world.run(60)