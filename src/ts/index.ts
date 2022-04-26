import '../css/3dengine.css'
import World from './core/World'
import BackgroundElem from './ObjectsWorld/BackgroundElem'
import Cube from './ObjectsWorld/Cube'
import Pyramid from './ObjectsWorld/Pyramid'

const world = new World(document.getElementById('world'))
world.addObjects(new Cube(10, {x:1,y:0,z:0}))
world.addObjects(new Pyramid(300, {x:1,y:-100,z:500}))
world.addObjects(new Pyramid(100, {x:100,y:100,z:100}))
world.addBgElem(new BackgroundElem('../textures/seraphim.png', 200, 100))
world.addBgElem(new BackgroundElem('../textures/seraphim.png', 400, 100))
world.addBgElem(new BackgroundElem('../textures/seraphim.png', 600, 300))
world.setBackground('../textures/sky.png')

world.run(60)