import './engine.ts'

add(sphere(10, 100, 100, 0, 'red'))
add(cube(10, 100, 100, 100, 'red'))
add(pyramid(10, 30, 30, 30, 'red'))
add(parallelepiped(10, 30, 30, 30, 100, 200, 'red'))
// const world = new World(document.getElementById('world'))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 200, 100))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 400, 100))
// world.addBgElem(new BackgroundElem('../textures/seraphim.png', 600, 300))

// world.run(60)