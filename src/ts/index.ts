import '../css/3dengine.css'
import World from './core/World'
import BackgroundElem from './ObjectsWorld/BackgroundElem'
import Cube from './ObjectsWorld/Cube'
import Pyramid from './ObjectsWorld/Pyramid'

const world = new World(document.getElementById('world'))
world.addObjects(new Cube(10, {x:1,y:0,z:0}, 'black', '../textures/brick.png'))
world.addObjects(new Pyramid(300, {x:1,y:-100,z:500}))
world.addObjects(new Pyramid(100, {x:500,y:100,z:100}, 'red'))
world.addObjects(new Pyramid(100, {x:100,y:100,z:600}, 'red'))
world.addObjects(new Pyramid(50, {x:900,y:1000,z:300}, 'yellow'))
world.addObjects(new Pyramid(200, {x:100,y:100,z:100}, 'yellow'))
world.addBgElem(new BackgroundElem('../textures/seraphim.png', 200, 100))
world.addBgElem(new BackgroundElem('../textures/seraphim.png', 400, 100))
world.addBgElem(new BackgroundElem('../textures/seraphim.png', 600, 300))
world.setBackground('../textures/sky.png')

world.run(60)


document.querySelector('#save').addEventListener('click', () => {
  const svgRoot = world.svgRootElement
  const serializer = new XMLSerializer()

  let source = serializer.serializeToString(svgRoot)
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source
  
  const url = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(source);
  const a = document.createElement('a')
  const e = new MouseEvent('click')

  a.download = 'download.svg';
  a.href = url
  a.dispatchEvent(e)
})