import '../css/3dengine.css'
import ObjectWorld from './core/ObjectWorld'

import World from './core/World'
import Cube from './ObjectsWorld/Cube'
import Pyramid from './ObjectsWorld/Pyramid'

declare global {
  interface Window { 
    cube: (size: number, x: number, y: number, z: number, color: string) => Cube
    pyramid: (size: number, x: number, y: number, z: number, color: string) => Pyramid
    add: (...obj: ObjectWorld[]) => void

    setBackground: (urlImage: string) => void
    saveScreen: () => void
  }
}

const world = new World(document.getElementById('world'))
window.cube = (size: number, x = 0, y = 0, z = 0, color = 'black') => new Cube(size, {x, y, z}, color)
window.pyramid = (size: number, x = 0, y = 0, z = 0, color = 'black') => new Pyramid(size, {x, y, z}, color)
window.setBackground = (urlImage: string) => world.setBackground(urlImage)
window.add = (...obj: ObjectWorld[]) => world.addObjects(...obj)

window.saveScreen = () => {
  const svgRoot = world.svgRootElement
  const serializer = new XMLSerializer()

  let source = serializer.serializeToString(svgRoot)
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source
  
  const url = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(source)
  const a = document.createElement('a')
  const e = new MouseEvent('click')

  a.download = 'download.svg'
  a.href = url
  a.dispatchEvent(e)
}

world.run(60)