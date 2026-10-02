import type { SVGEngine } from '../src/ts/engine'
import type ObjectWorld from '../src/ts/core/ObjectWorld'
import type Point from '../src/ts/core/Point'

export interface Scene {
  /** CSS-фон под сценой; совпадает с цветом тумана, чтобы даль растворялась */
  backdrop: string
  /** вызывается каждый кадр; t — секунды с начала сцены */
  update?: (t: number) => void
  /** куда смотрит автопилот, пока пользователь не взял управление; null — камера стоит на месте */
  orbit: { target: Point; radius: number; height: number; speed: number } | null
  /** если файл модели ещё грузится — объекты, добавленные позже */
  ready?: Promise<unknown>
}

const checkerFloor = (engine: SVGEngine, size: number, y: number, a: string, b: string) => {
  const floor = engine.floor(size, 0, y, 0, a)
  const cells = Math.round(Math.sqrt(floor.polygons.length))
  floor.polygons.forEach((p, i) => {
    if ((Math.floor(i / cells) + (i % cells)) % 2) p.fillColor = b
  })
  return floor
}

const lit = (engine: SVGEngine): Scene => {
  const fog = '#cddff0'
  engine.setLight({ direction: { x: -0.5, y: 1, z: -0.35 }, ambient: 0.32, intensity: 0.8, specular: 0.2 })
  engine.setFog({ color: fog, near: 120, far: 330 })

  const cube = engine.cube(14, -24, 9, 0, '#e5484d')
  const sphere = engine.sphere(9, 22, 9, -6, '#30a46c', undefined, 18)
  const pyramid = engine.pyramid(14, 0, 7, 26, '#f76b15')
  const torus = engine.torus(9, 3, 0, 22, -14, '#8e4ec6', 28)
  const columns: ObjectWorld[] = []
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    columns.push(engine.parallelepiped(4, 26, 4, Math.cos(a) * 62, 13, Math.sin(a) * 62, '#f1e7d0'))
  }

  engine.add(checkerFloor(engine, 300, 0, '#9aa4b1', '#7c8693'), cube, sphere, pyramid, torus, ...columns)

  return {
    backdrop: `linear-gradient(#7fb2e5, ${fog} 50%)`,
    orbit: { target: { x: 0, y: 8, z: 0 }, radius: 120, height: 42, speed: 0.12 },
    update: (t) => {
      cube.rotate(0.6, 0.9, 0)
      torus.rotate(0.8, 0, 0.5)
      pyramid.rotate(0, -0.7, 0)
      sphere.setPosition(22, 9 + Math.abs(Math.sin(t * 2)) * 10, -6)
    },
  }
}

const synthwave = (engine: SVGEngine): Scene => {
  const horizon = '#3b0c4f'
  engine.setLight(null)
  engine.setFog({ color: horizon, near: 30, far: 300 })
  engine.setGlow({ blur: 3, strength: 2 })

  const cell = 10
  const grid = engine.floor(400, 0, 0, 120, '#12021f').setStroke('#ff2a6d', 1.4)

  const mountains: ObjectWorld[] = []
  for (let i = 0; i < 14; i++) {
    const side = i % 2 ? 1 : -1
    const size = 22 + ((i * 37) % 30)
    const x = side * (55 + ((i * 53) % 70))
    mountains.push(
      engine
        .pyramid(size, x, size / 2 - 1, 120 + ((i * 71) % 80), '#12021f')
        .setStroke('#05d9e8', 1.2)
        .setShading(false),
    )
  }

  const crystal = engine.sphere(6, -30, 14, 75, '#1a0533', undefined, 7).setStroke('#f9f871', 1.2).setShading(false)
  const ring = engine.torus(9, 1.2, 30, 14, 75, '#1a0533', 26).setStroke('#05d9e8', 1).setShading(false)

  engine.add(grid, ...mountains, ring, crystal)
  engine.player.position = { x: 0, y: 7, z: -20 }
  engine.player.rotation = { ax: 0, ay: 0, az: 0 }

  let shift = 0
  return {
    backdrop: `linear-gradient(#090014 0%, #2d0b4e 40%, ${horizon} 50%, ${horizon} 100%)`,
    orbit: null,
    update: (t) => {
      //пол едет на камеру и незаметно перескакивает на одну клетку назад — бесконечная дорога
      const speed = 0.9
      grid.translate(0, 0, -speed)
      shift += speed
      if (shift >= cell) {
        grid.translate(0, 0, cell)
        shift -= cell
      }
      crystal.rotate(0.4, 1.1, 0)
      crystal.setPosition(-30, 14 + Math.sin(t * 1.6) * 2, 75)
      ring.rotate(0, 0.5, 0.9)
      if (!engine.player.isControlled) engine.player.rotation.ax = Math.sin(t * 0.5) * 2
    },
  }
}

const teapot = (engine: SVGEngine): Scene => {
  const fog = '#151821'
  engine.setLight({
    direction: { x: -0.6, y: 0.9, z: -0.5 },
    ambient: 0.22,
    intensity: 0.9,
    specular: 0.55,
    shininess: 40,
  })
  engine.setFog({ color: fog, near: 140, far: 320 })

  const floor = checkerFloor(engine, 200, -16, '#2a2f3d', '#222633')
  engine.add(floor)

  let pot: ObjectWorld | null = null
  const ready = engine
    .loadObj(new URL('./models/teapot.obj', import.meta.url).href, 0, 0, 0, { size: 44, color: '#d1495b' })
    .then((mesh) => {
      //модель отцентрирована по габаритам — ставим её донышком на пол
      const bottom = Math.min(...mesh.polygons.flatMap((p) => p.points.map((pt) => pt.y)))
      mesh.translate(0, -16 - bottom, 0)
      pot = mesh
      engine.add(mesh)
    })

  return {
    backdrop: `radial-gradient(circle at 50% 35%, #2c3245, ${fog} 70%)`,
    orbit: { target: { x: 0, y: -2, z: 0 }, radius: 70, height: 26, speed: 0.18 },
    ready,
    update: () => pot?.rotate(0, 0.4, 0),
  }
}

const surfaces = (engine: SVGEngine): Scene => {
  const fog = '#bcd7ea'
  engine.setLight({
    direction: { x: -0.4, y: 0.8, z: -0.5 },
    ambient: 0.3,
    intensity: 0.8,
    specular: 0.6,
    shininess: 30,
  })
  engine.setFog({ color: fog, near: 90, far: 260 })

  const sea = engine.waves(240, 3, 0, 0, 0, '#1f6fb8', 30)
  const torus = engine.torus(10, 3.5, -22, 22, 0, '#ffb224', 30)
  const mobius = engine.mobius(11, 7, 22, 22, 0, '#e93d82', 60)
  engine.add(sea, torus, mobius)

  return {
    backdrop: `linear-gradient(#5c9ed6, ${fog} 50%)`,
    orbit: { target: { x: 0, y: 12, z: 0 }, radius: 105, height: 30, speed: 0.1 },
    update: (t) => {
      sea.setTime(t)
      torus.rotate(0.7, 0.4, 0)
      mobius.rotate(0, 0.8, 0.3)
      torus.setPosition(-22, 22 + Math.sin(t * 1.4) * 2, 0)
      mobius.setPosition(22, 22 + Math.cos(t * 1.2) * 2, 0)
    },
  }
}

export const scenes: Record<string, (engine: SVGEngine) => Scene> = { lit, synthwave, teapot, surfaces }
