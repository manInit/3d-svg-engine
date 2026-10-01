import { describe, expect, it } from 'vitest'
import RenderPipe, { type CameraState } from '../src/ts/core/RenderPipe'

const camera = (): CameraState => ({
  position: { x: 0, y: 0, z: 0 },
  rotation: { ax: 0, ay: 0, az: 0 },
})

describe('RenderPipe.clipZ', () => {
  it('keeps polygon fully in front of the plane', () => {
    const points = [
      { x: 0, y: 0, z: 1 },
      { x: 1, y: 0, z: 2 },
      { x: 0, y: 1, z: 3 },
    ]
    expect(RenderPipe.clipZ(points, 0.1, true)).toEqual(points)
  })

  it('removes polygon fully behind the plane', () => {
    const points = [
      { x: 0, y: 0, z: -1 },
      { x: 1, y: 0, z: -2 },
      { x: 0, y: 1, z: -3 },
    ]
    expect(RenderPipe.clipZ(points, 0.1, true)).toEqual([])
  })

  it('cuts polygon crossing the plane', () => {
    const points = [
      { x: -1, y: 0, z: -1 },
      { x: 1, y: 0, z: -1 },
      { x: 1, y: 0, z: 1 },
      { x: -1, y: 0, z: 1 },
    ]
    const clipped = RenderPipe.clipZ(points, 0, true)

    expect(clipped).toHaveLength(4)
    for (const p of clipped) expect(p.z).toBeGreaterThanOrEqual(0)
    expect(clipped).toContainEqual({ x: 1, y: 0, z: 0 })
    expect(clipped).toContainEqual({ x: -1, y: 0, z: 0 })
  })

  it('clips by far plane', () => {
    const points = [
      { x: 0, y: 0, z: 5 },
      { x: 0, y: 0, z: 15 },
    ]
    const clipped = RenderPipe.clipZ(points, 10, false)
    for (const p of clipped) expect(p.z).toBeLessThanOrEqual(10)
  })
})

describe('RenderPipe.convertPoints', () => {
  it('projects point in front of camera to the screen center', () => {
    const pipe = new RenderPipe(800, 600, 100, 1000, camera())
    const { points, averageDistance } = pipe.convertPoints([{ x: 0, y: 0, z: 10 }])

    expect(points).toHaveLength(1)
    expect(points[0].x).toBeCloseTo(400)
    expect(points[0].y).toBeCloseTo(300)
    expect(averageDistance).toBeCloseTo(10)
  })

  it('returns no points and infinite distance for polygon behind camera', () => {
    const pipe = new RenderPipe(800, 600, 100, 1000, camera())
    const { points, averageDistance } = pipe.convertPoints([
      { x: 0, y: 0, z: -10 },
      { x: 1, y: 0, z: -10 },
      { x: 0, y: 1, z: -10 },
    ])

    expect(points).toEqual([])
    expect(averageDistance).toBe(Infinity)
    expect(Number.isNaN(averageDistance)).toBe(false)
  })

  it('sees point behind after camera turns around', () => {
    const cam = camera()
    cam.rotation.ay = 180
    const pipe = new RenderPipe(800, 600, 100, 1000, cam)
    const { points } = pipe.convertPoints([{ x: 0, y: 0, z: -10 }])

    expect(points).toHaveLength(1)
    expect(points[0].x).toBeCloseTo(400)
  })

  it('applies new viewport size', () => {
    const pipe = new RenderPipe(800, 600, 100, 1000, camera())
    pipe.setViewport(200, 100, 50)
    const { points } = pipe.convertPoints([{ x: 0, y: 0, z: 10 }])

    expect(points[0].x).toBeCloseTo(100)
    expect(points[0].y).toBeCloseTo(50)
  })
})
