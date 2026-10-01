import { degToRad } from '../utils/angle'
import type Point from './Point'

type ControlKey = 'w' | 's' | 'a' | 'd' | 'shift' | 'space'

const keyCodes: Record<string, ControlKey> = {
  KeyW: 'w',
  KeyS: 's',
  KeyA: 'a',
  KeyD: 'd',
  ShiftLeft: 'shift',
  Space: 'space',
}

//клавиши, у которых нужно отменять действие браузера (прокрутку страницы)
const preventDefaultCodes = ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export default class Camera {
  //ay — рыскание (поворот вокруг вертикали), az — тангаж (вверх/вниз), ax — крен
  public rotation = { ax: 0, ay: 0, az: 0 }
  public position: Point = { x: 0, y: 0, z: 0 }

  private rotationSpeed = { ay: 0, az: 0 }
  private speedComponents: Point = { x: 0, y: 0, z: 0 }

  private root: HTMLElement
  private keys: Record<ControlKey, boolean> = {
    w: false,
    s: false,
    d: false,
    a: false,
    shift: false,
    space: false,
  }

  private angleSpeed = 3
  private speed = 2
  private azMax = 70

  private removeListeners: () => void

  constructor(root: HTMLElement) {
    this.root = root

    this.removeListeners = this.setControls()
  }

  public update(): void {
    this.updateSpeed()

    this.position.x += this.speedComponents.x
    this.position.y += this.speedComponents.y
    this.position.z += this.speedComponents.z

    this.rotation.ay = (this.rotation.ay + this.rotationSpeed.ay) % 360
    this.rotation.ax %= 360
    this.changeZAngle(this.rotationSpeed.az)
  }

  public destroy(): void {
    this.removeListeners()
    this.resetControls()
  }

  private changeZAngle(daz: number): void {
    this.rotation.az = Math.max(-this.azMax, Math.min(this.azMax, this.rotation.az + daz))
  }

  private updateSpeed(): void {
    const vec = { x: 0, y: 0, z: 0 }

    const sinY = Math.sin(degToRad(this.rotation.ay))
    const cosY = Math.cos(degToRad(this.rotation.ay))
    const sinZ = Math.sin(degToRad(this.rotation.az))
    const cosZ = Math.cos(degToRad(this.rotation.az))

    //единичный вектор направления взгляда
    const forward = { x: sinY * cosZ, y: -sinZ, z: cosY * cosZ }
    //горизонтальный вектор вправо
    const right = { x: cosY, y: 0, z: -sinY }

    const move = (dir: Point, k: number) => {
      vec.x += dir.x * k
      vec.y += dir.y * k
      vec.z += dir.z * k
    }

    if (this.keys.w) move(forward, this.speed)
    if (this.keys.s) move(forward, -this.speed)
    if (this.keys.d) move(right, this.speed)
    if (this.keys.a) move(right, -this.speed)

    if (this.keys.shift) vec.y -= this.speed
    if (this.keys.space) vec.y += this.speed

    this.speedComponents = vec
  }

  private resetControls(): void {
    for (const key of Object.keys(this.keys) as ControlKey[]) this.keys[key] = false
    this.rotationSpeed.ay = 0
    this.rotationSpeed.az = 0
  }

  private setControls(): () => void {
    const mousemoveHandler = (e: MouseEvent) => {
      this.rotation.ay += e.movementX / 10
      this.changeZAngle(e.movementY / 10)
    }

    const keyUpListener = (e: KeyboardEvent) => {
      const key = keyCodes[e.code]
      if (key) this.keys[key] = false

      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') this.rotationSpeed.ay = 0
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') this.rotationSpeed.az = 0
    }

    const keyDownListener = (e: KeyboardEvent) => {
      if (preventDefaultCodes.includes(e.code)) e.preventDefault()

      const key = keyCodes[e.code]
      if (key) this.keys[key] = true

      if (e.code === 'ArrowRight') this.rotationSpeed.ay = this.angleSpeed
      if (e.code === 'ArrowLeft') this.rotationSpeed.ay = -this.angleSpeed
      if (e.code === 'ArrowUp') this.rotationSpeed.az = -this.angleSpeed
      if (e.code === 'ArrowDown') this.rotationSpeed.az = this.angleSpeed
    }

    const removeInputListeners = () => {
      document.removeEventListener('mousemove', mousemoveHandler)
      document.removeEventListener('keyup', keyUpListener)
      document.removeEventListener('keydown', keyDownListener)
    }

    const pointerLockChangeHandler = () => {
      if (document.pointerLockElement === this.root) {
        document.addEventListener('mousemove', mousemoveHandler)
        document.addEventListener('keyup', keyUpListener)
        document.addEventListener('keydown', keyDownListener)
      } else {
        removeInputListeners()
        //иначе клавиша, зажатая в момент выхода из захвата, «залипнет»
        this.resetControls()
      }
    }

    //управление только когда курсор захвачен
    const clickHandler = () => {
      this.root.requestPointerLock()
    }

    document.addEventListener('pointerlockchange', pointerLockChangeHandler)
    this.root.addEventListener('click', clickHandler)

    return () => {
      removeInputListeners()
      document.removeEventListener('pointerlockchange', pointerLockChangeHandler)
      this.root.removeEventListener('click', clickHandler)
    }
  }
}
