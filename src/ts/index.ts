import '../css/3dengine.css'
import World from './core/World'
import Cube from './ObjectsWorld/Cube'

const world = new World(document.getElementById('world'))
world.addObjects(new Cube(10, {x:1,y:0,z:0}))
world.run(60)