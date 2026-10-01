import { describe, expect, it } from 'vitest'
import TransformMatrix from '../src/ts/core/TransformMatrix'
import type Point from '../src/ts/core/Point'

const expectPoint = (actual: Point, expected: Point) => {
  expect(actual.x).toBeCloseTo(expected.x)
  expect(actual.y).toBeCloseTo(expected.y)
  expect(actual.z).toBeCloseTo(expected.z)
}

describe('TransformMatrix', () => {
  it('translates a point', () => {
    expectPoint(TransformMatrix.translate({ x: 1, y: 2, z: 3 }, 10, -2, 0.5), { x: 11, y: 0, z: 3.5 })
  })

  it('scales a point', () => {
    expectPoint(TransformMatrix.scale({ x: 1, y: 2, z: 3 }, 2, -1, 0), { x: 2, y: -2, z: 0 })
  })

  it('rotates around X by 90 degrees', () => {
    expectPoint(TransformMatrix.rotateX({ x: 0, y: 1, z: 0 }, 90), { x: 0, y: 0, z: -1 })
  })

  it('rotates around Y by 90 degrees', () => {
    expectPoint(TransformMatrix.rotateY({ x: 1, y: 0, z: 0 }, 90), { x: 0, y: 0, z: 1 })
  })

  it('rotates around Z by 90 degrees', () => {
    expectPoint(TransformMatrix.rotateZ({ x: 1, y: 0, z: 0 }, 90), { x: 0, y: -1, z: 0 })
  })

  it('keeps axis points unchanged when rotating around that axis', () => {
    expectPoint(TransformMatrix.rotateX({ x: 5, y: 0, z: 0 }, 37), { x: 5, y: 0, z: 0 })
    expectPoint(TransformMatrix.rotateY({ x: 0, y: 5, z: 0 }, 37), { x: 0, y: 5, z: 0 })
    expectPoint(TransformMatrix.rotateZ({ x: 0, y: 0, z: 5 }, 37), { x: 0, y: 0, z: 5 })
  })

  it('projects with perspective', () => {
    expectPoint(TransformMatrix.perspectiveProjection({ x: 10, y: -20, z: 50 }, 100), { x: 20, y: -40, z: 0 })
  })
})
