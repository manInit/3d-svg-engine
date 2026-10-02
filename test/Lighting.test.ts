// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import Cube from '../src/ts/ObjectsWorld/Cube'
import Pyramid from '../src/ts/ObjectsWorld/Pyramid'
import Sphere from '../src/ts/ObjectsWorld/Sphere'
import Square from '../src/ts/ObjectsWorld/Square'
import ParametricSurface, { torusFunction } from '../src/ts/ObjectsWorld/ParametricSurface'
import Mesh from '../src/ts/ObjectsWorld/Mesh'
import ObjectWorld from '../src/ts/core/ObjectWorld'
import Polygon from '../src/ts/core/Polygon'
import Camera from '../src/ts/core/Camera'
import RenderPipe from '../src/ts/core/RenderPipe'
import { createFog, createLight, defaultLight, fogFactor, shade, type Environment } from '../src/ts/core/Lighting'
import { parseColor, toCss } from '../src/ts/utils/color'
import { parseObj } from '../src/ts/utils/obj'
import { centroid, dot, polygonNormal, sub } from '../src/ts/utils/vector'

const expectOutward = (obj: ObjectWorld, center = obj.position) => {
  for (const p of obj.polygons) {
    expect(dot(polygonNormal(p.points), sub(centroid(p.points), center))).toBeGreaterThan(0)
  }
}

const camera = { position: { x: 0, y: 0, z: -50 }, rotation: { ax: 0, ay: 0, az: 0 } }
const pipe = () => new RenderPipe(800, 600, 500, 100000, camera)
const env = (overrides: Partial<Environment> = {}): Environment => ({
  light: createLight(defaultLight),
  fog: null,
  cameraPosition: camera.position,
  ...overrides,
})

describe('color', () => {
  it('parses hex, short hex, rgb() and names', () => {
    expect(parseColor('#ff8000')).toEqual({ r: 255, g: 128, b: 0 })
    expect(parseColor('#f80')).toEqual({ r: 255, g: 136, b: 0 })
    expect(parseColor('rgb(1, 2, 3)')).toEqual({ r: 1, g: 2, b: 3 })
    expect(parseColor('Red')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('returns null for none and textures', () => {
    expect(parseColor('none')).toBeNull()
    expect(parseColor('url(#texture-1)')).toBeNull()
  })

  it('clamps when serializing', () => {
    expect(toCss({ r: 300, g: -5, b: 10.4 })).toBe('rgb(255,0,10)')
  })
})

describe('normals', () => {
  it('primitives have outward normals', () => {
    expectOutward(new Cube(10, { x: 3, y: 4, z: 5 }))
    expectOutward(new Pyramid(10, { x: 0, y: 0, z: 0 }))
    expectOutward(new Sphere({ x: 1, y: 2, z: 3 }, 5, 'black', undefined, 12))
  })

  it('torus normals point away from the tube', () => {
    const R = 10
    const torus = new ParametricSurface(torusFunction(R, 3), { x: 0, y: 0, z: 0 }, { closed: true })
    for (const p of torus.polygons) {
      const c = centroid(p.points)
      const ring = Math.hypot(c.x, c.z)
      const tubeCenter = { x: (c.x / ring) * R, y: 0, z: (c.z / ring) * R }
      expect(dot(polygonNormal(p.points), sub(c, tubeCenter))).toBeGreaterThan(0)
    }
  })

  it('obj meshes keep outward normals after the handedness flip', () => {
    //тетраэдр с гранями против часовой стрелки при взгляде снаружи (правая система)
    const obj = `
      v 0 0 0
      v 1 0 0
      v 0 1 0
      v 0 0 1
      f 1 3 2
      f 1 2 4
      f 1 4 3
      f 2 3 4
    `
    const mesh = new Mesh(parseObj(obj), { x: 0, y: 0, z: 0 })
    const center = centroid(mesh.polygons.flatMap((p) => p.points))
    expectOutward(mesh, center)
  })
})

describe('obj parser', () => {
  it('supports slashes, negative indices and n-gons', () => {
    const data = parseObj('v 0 0 0\nv 1 0 0\nv 1 1 0\nv 0 1 0\nf 1/1/1 2//1 -2/3 -1\n# comment\nf 1 2\n')
    expect(data.vertices).toHaveLength(4)
    expect(data.faces).toEqual([[0, 1, 2, 3]])
  })

  it('normalizes mesh size', () => {
    const mesh = new Mesh(parseObj('v 0 0 0\nv 4 0 0\nv 0 2 0\nf 1 2 3'), { x: 10, y: 0, z: 0 }, { size: 8 })
    const xs = mesh.polygons[0].points.map((p) => p.x)
    expect(Math.min(...xs)).toBeCloseTo(6)
    expect(Math.max(...xs)).toBeCloseTo(14)
  })
})

describe('shading', () => {
  it('lit faces are brighter than faces in shadow', () => {
    const light = createLight({ ...defaultLight, direction: { x: 0, y: 1, z: 0 }, specular: 0 })
    const base = { r: 200, g: 100, b: 50 }
    const toCamera = { x: 0, y: 0, z: -1 }
    const top = shade(base, { x: 0, y: 1, z: 0 }, toCamera, light)
    const bottom = shade(base, { x: 0, y: -1, z: 0 }, toCamera, light)

    expect(top.r).toBeGreaterThan(bottom.r)
    expect(bottom.r).toBeCloseTo(200 * defaultLight.ambient)
  })

  it('fog grows linearly between near and far', () => {
    const fog = createFog({ color: '#fff', near: 100, far: 200 })
    expect(fogFactor(50, fog)).toBe(0)
    expect(fogFactor(150, fog)).toBeCloseTo(0.5)
    expect(fogFactor(500, fog)).toBe(1)
  })
})

describe('Polygon.render', () => {
  it('culls back faces and draws front faces', () => {
    const cube = new Cube(10, { x: 0, y: 0, z: 0 })
    for (const p of cube.polygons) p.render(pipe(), env())

    //камера смотрит прямо на переднюю грань — видна ровно одна
    const visible = cube.polygons.filter((p) => p.tagElem.getAttribute('points'))
    expect(visible).toHaveLength(1)
    expect(cube.polygons.filter((p) => p.averageDistance === Infinity)).toHaveLength(5)
  })

  it('keeps double sided polygons visible from behind and shades them', () => {
    const square = new Square(10, { x: 0, y: 0, z: 0 }, '#808080')
    square.polygons[0].flip()
    square.polygons[0].render(pipe(), env())

    expect(square.polygons[0].tagElem.getAttribute('points')).not.toBe('')
    expect(square.polygons[0].tagElem.getAttribute('fill')).toMatch(/^rgb\(/)
  })

  it('applies fog to fill and stroke', () => {
    const polygon = new Polygon(
      [
        { x: -1, y: -1, z: 0 },
        { x: -1, y: 1, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 1, y: -1, z: 0 },
      ],
      '#000000',
    )
    polygon.doubleSided = true
    polygon.setStroke('#000000', 2)
    polygon.render(pipe(), env({ light: null, fog: createFog({ color: '#ffffff', near: 0, far: 1 }) }))

    expect(polygon.tagElem.getAttribute('fill')).toBe('rgb(255,255,255)')
    expect(polygon.tagElem.getAttribute('stroke')).toBe('rgb(255,255,255)')
  })

  it('parametric surfaces keep rotation when animated', () => {
    const surface = new ParametricSurface((u, v) => ({ x: u, y: 0, z: v }), { x: 0, y: 0, z: 0 }, { segmentsU: 1 })
    surface.rotate(0, 0, 90)
    surface.setTime(1)

    for (const p of surface.polygons.flatMap((polygon) => polygon.points)) expect(p.x).toBeCloseTo(0)
  })
})

describe('Camera.lookAt', () => {
  it('turns the camera towards the target', () => {
    const cam = new Camera(document.createElement('div'))
    cam.position = { x: 0, y: 10, z: 0 }
    cam.lookAt({ x: 10, y: 0, z: 10 })

    const p = new RenderPipe(800, 600, 500, 100000, cam).convertPoints([{ x: 10, y: 0, z: 10 }]).points[0]
    expect(p.x).toBeCloseTo(400)
    expect(p.y).toBeCloseTo(300)
    cam.destroy()
  })
})
