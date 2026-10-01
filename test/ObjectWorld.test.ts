// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import Cube from '../src/ts/ObjectsWorld/Cube'
import Sphere from '../src/ts/ObjectsWorld/Sphere'
import Floor from '../src/ts/ObjectsWorld/Floor'
import Pyramid from '../src/ts/ObjectsWorld/Pyramid'
import ObjectWorld from '../src/ts/core/ObjectWorld'

const bounds = (obj: ObjectWorld) => {
  const points = obj.polygons.flatMap((p) => p.points)
  const axis = (k: 'x' | 'y' | 'z') => ({
    min: Math.min(...points.map((p) => p[k])),
    max: Math.max(...points.map((p) => p[k])),
  })
  return { x: axis('x'), y: axis('y'), z: axis('z') }
}

describe('figures', () => {
  it('places cube at the given center', () => {
    const cube = new Cube(10, { x: 5, y: -3, z: 100 })
    const b = bounds(cube)

    expect(b.x).toEqual({ min: 0, max: 10 })
    expect(b.y).toEqual({ min: -8, max: 2 })
    expect(b.z).toEqual({ min: 95, max: 105 })
    expect(cube.position).toEqual({ x: 5, y: -3, z: 100 })
  })

  it('places other figures at the given center too', () => {
    expect(new Pyramid(4, { x: 1, y: 2, z: 3 }).position).toEqual({ x: 1, y: 2, z: 3 })
    expect(new Sphere({ x: 1, y: 2, z: 3 }, 5).position).toEqual({ x: 1, y: 2, z: 3 })
  })

  it('rotates around its own center on each axis', () => {
    const rotations: [number, number, number][] = [
      [90, 0, 0],
      [0, 90, 0],
      [0, 0, 90],
    ]
    for (const angles of rotations) {
      const cube = new Cube(10, { x: 50, y: 50, z: 50 })
      cube.rotate(...angles)
      const b = bounds(cube)

      for (const axis of [b.x, b.y, b.z]) {
        expect(axis.min).toBeCloseTo(45)
        expect(axis.max).toBeCloseTo(55)
      }
    }
  })

  it('rotates around Y axis (not X)', () => {
    const pyramid = new Pyramid(10, { x: 0, y: 0, z: 0 })
    pyramid.rotate(0, 90, 0)
    const b = bounds(pyramid)

    //поворот вокруг вертикали не меняет высоту пирамиды
    expect(b.y.min).toBeCloseTo(-5)
    expect(b.y.max).toBeCloseTo(5)
  })

  it('moves to a new position', () => {
    const sphere = new Sphere({ x: 0, y: 0, z: 0 }, 1)
    sphere.translate(1, 1, 1)
    sphere.setPosition(10, 0, -10)

    expect(sphere.position).toEqual({ x: 10, y: 0, z: -10 })
    const b = bounds(sphere)
    expect(b.x.min).toBeCloseTo(9)
    expect(b.x.max).toBeCloseTo(11)
  })

  it('builds floor with integer grid for any size', () => {
    const floor = new Floor(25, { x: 0, y: 0, z: 0 })
    const b = bounds(floor)

    expect(floor.polygons.length).toBe(9)
    for (const p of floor.polygons) {
      for (const point of p.points) expect(point).toBeDefined()
    }
    expect(b.x.min).toBeCloseTo(-12.5)
    expect(b.x.max).toBeCloseTo(12.5)
  })
})
