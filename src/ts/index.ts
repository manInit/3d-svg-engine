import '../css/3dengine.css'
import World from './core/World'
import Cube from './ObjectsWorld/Cube'
import Pyramid from './ObjectsWorld/Pyramid'

const world = new World(document.getElementById('world'))
world.addObjects(new Cube(10, {x:1,y:0,z:0}))
world.addObjects(new Pyramid(300, {x:1,y:-100,z:500}))
world.addObjects(new Pyramid(100, {x:100,y:100,z:100}))
world.setBackground('../textures/sky.png')
world.run(60)