import './engine.ts'

const sphere1 = sphere(10, 100, 100, 0, 'red')
const pyramid1 = pyramid(10, 0, 0, 0, 'red')
const cube1 = cube(10, 100, 100, 100, 'red')
const x = parallelepiped(10, 30, 30, 30, 100, 200, 'red')
add(sphere1, cube1, x, pyramid1)

let ax = 0
update(() => {
  sphere1.translate(1, 1, 0)
  cube1.rotate(1, 0, 0)
  x.translate(Math.sin(ax), Math.sin(ax), 0)
  ax += 0.1
})
// const world = new World(document.getElementById('world'))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 200, 100))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 400, 100))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 600, 300))

// world.run(60)