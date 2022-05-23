import './engine.ts'

const engine = SVGEngine('world')
const cube = engine.cube(100)
engine.add(cube)