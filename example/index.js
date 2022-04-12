setBackground('./1.png')
showMapWorld(200)

let cube1 = cube(100, 'red', 100, 100, 1000)
add(cube1)

let pyramid1 = pyramid(350, 'yellow', -100, 0, -100)
add(pyramid1)

let plane1 = plane('orange', {x:0, y: 0, z: 0}, {x: 100, y: 0, z: 0}, {x: 100, y: 100, z: 0})
add(plane1)

let floor1 = floor(300, 'blue', -500, -10, -500)
add(floor1)