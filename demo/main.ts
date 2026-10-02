//движок регистрирует глобальную функцию window.SVGEngine
// oxlint-disable-next-line import/no-unassigned-import
import '../src/ts/engine'
import type { SVGEngine } from '../src/ts/engine'
import type Polygon from '../src/ts/core/Polygon'
import { scenes, type Scene } from './scenes'

const body = document.body
const backdrop = document.getElementById('backdrop')!
const stats = document.getElementById('stats')!
const wireframeButton = document.getElementById('wireframe')!
const sceneButtons = [...document.querySelectorAll<HTMLButtonElement>('#scenes button')]

let engine: SVGEngine | null = null
let current = ''
let wireframe = false
let savedFills = new Map<Polygon, string>()

const applyWireframe = () => {
  if (!engine) return
  for (const obj of engine.objects) {
    for (const p of obj.polygons) {
      if (wireframe && !savedFills.has(p)) {
        savedFills.set(p, p.fillColor)
        p.setStroke(p.fillColor === 'none' ? '#fff' : p.fillColor, 1)
        p.fillColor = 'none'
        p.doubleSided = true
      } else if (!wireframe && savedFills.has(p)) {
        p.fillColor = savedFills.get(p)!
        p.setStroke(null)
        savedFills.delete(p)
      }
    }
  }
}

const start = (name: string) => {
  if (!scenes[name]) name = 'lit'
  if (name === current) return
  current = name

  engine?.destroy()
  document.exitPointerLock?.()
  //у сцены synthwave свои обводки — режим каркаса сбрасываем при каждой смене
  wireframe = false
  savedFills = new Map()
  wireframeButton.setAttribute('aria-pressed', 'false')

  engine = window.SVGEngine('world')
  const scene: Scene = scenes[name](engine)
  const player = engine.player

  body.dataset.scene = name
  backdrop.style.background = scene.backdrop
  for (const b of sceneButtons) b.setAttribute('aria-pressed', String(b.dataset.scene === name))
  if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name)

  const t0 = performance.now()
  let frames = 0
  let fpsFrom = t0
  const localEngine = engine

  scene.ready?.then(() => wireframe && applyWireframe())

  engine.update(() => {
    const now = performance.now()
    const t = (now - t0) / 1000
    scene.update?.(t)

    //автопилот облетает сцену, пока пользователь не захватил курсор
    if (scene.orbit && !player.isControlled) {
      const { target, radius, height, speed } = scene.orbit
      const a = t * speed - Math.PI / 2
      player.position = {
        x: target.x + Math.cos(a) * radius,
        y: target.y + height + Math.sin(t * 0.4) * 4,
        z: target.z + Math.sin(a) * radius,
      }
      player.lookAt(target)
    }

    frames++
    if (now - fpsFrom > 500) {
      const polygons = localEngine.objects.reduce((n, o) => n + o.polygons.length, 0)
      stats.textContent = `${Math.round((frames * 1000) / (now - fpsFrom))} fps · ${polygons} polygons`
      frames = 0
      fpsFrom = now
    }
  })
}

for (const b of sceneButtons) b.addEventListener('click', () => start(b.dataset.scene!))
window.addEventListener('hashchange', () => start(location.hash.slice(1)))

wireframeButton.addEventListener('click', () => {
  wireframe = !wireframe
  wireframeButton.setAttribute('aria-pressed', String(wireframe))
  applyWireframe()
})

document.getElementById('save')!.addEventListener('click', () => engine?.saveScreen(`svg-engine-${current}.svg`))

start(location.hash.slice(1))
