import { degToRad } from '../utils/angle'

export default class Camera {
  public rotation = { ax: 0, ay: 0, az: 0 }
  public position = { x: 0, y: 0, z:0 }
  
  private rotationSpeed = { ax: 0, ay: 0, az: 0 }
  private speedComponents = { x: 0, y: 0, z: 0 }

  private root: HTMLElement
  private keys = {
    w: false,
    s: false,
    d: false,
    a: false,
    shift: false,
    space: false
  }

  private angleSpeed = 3
  private speed = 0.5
  private azMax = 70

  constructor(root: HTMLElement) { 
    this.root = root

    this.setControls()
  }

  public update() {
    this.updateSpeed()

    this.position.x += this.speedComponents.x
    this.position.y += this.speedComponents.y
    this.position.z += this.speedComponents.z

    this.rotation.ax += this.rotationSpeed.ax
    this.rotation.ay += this.rotationSpeed.ay

    this.changeZAngle(this.rotationSpeed.az)
  }

  private changeZAngle(daz: number) {
    if (Math.abs(this.rotation.az) < this.azMax) {
      this.rotation.az += daz
    } else if (this.rotation.az > 0 && daz < 0 || this.rotation.az < 0 && daz > 0) {
      this.rotation.az += daz
    }
  }

  private updateSpeed() {
    const vec = { x: 0, y: 0, z: 0 }

    //направляющие косинусы
    const b = Math.cos(degToRad(this.rotation.ay))
    const c = Math.sin(degToRad(this.rotation.az))
    //из двух нужно определить третий ??? что-то все равно не так
    const a = Math.sin(degToRad(this.rotation.ay))

    if (this.keys.w) {
      vec.x += this.speed * a
      vec.z += this.speed * b
      vec.y -= this.speed * c
    } 
    if (this.keys.s) {
      vec.x -= this.speed * a
      vec.z -= this.speed * b
      vec.y += this.speed * c
    }
    if (this.keys.a) {
      vec.x -= this.speed * b
      vec.z += this.speed * a
    }
    if (this.keys.d) {
      vec.x += this.speed * b
      vec.z -= this.speed * a
    }

    if (this.keys.shift) vec.y -= this.speed
    if (this.keys.space) vec.y += this.speed
    
    this.speedComponents = vec
  }

  private setControls() {
    const mousemoveHandler = (e: MouseEvent) => {
      this.rotation.ay += e.movementX / 10
      this.changeZAngle(e.movementY / 10)
    }

    const keyUpListener = (e: KeyboardEvent) => {
      if (this.keys.w && e.code === 'KeyW') this.keys.w = false
      if (this.keys.s && e.code === 'KeyS') this.keys.s = false
      if (this.keys.a && e.code === 'KeyA') this.keys.a = false
      if (this.keys.d && e.code === 'KeyD') this.keys.d = false
      if (this.keys.shift && e.code === 'ShiftLeft') this.keys.shift = false
      if (this.keys.space && e.code === 'Space') this.keys.space = false
      
      if (e.key === 'ArrowRight') this.rotationSpeed.ay = 0
      if (e.key === 'ArrowLeft') this.rotationSpeed.ay = 0
      if (e.code === 'ArrowUp') this.rotationSpeed.az = 0
      if (e.code === 'ArrowDown') this.rotationSpeed.az = 0
    }

    const keyDownListener = (e: KeyboardEvent) => {
      if (!this.keys.w) this.keys.w = e.code === 'KeyW'
      if (!this.keys.s) this.keys.s = e.code === 'KeyS'
      if (!this.keys.a) this.keys.a = e.code === 'KeyA'
      if (!this.keys.d) this.keys.d = e.code === 'KeyD'
      if (!this.keys.shift) this.keys.shift = e.code === 'ShiftLeft'
      if (!this.keys.space) this.keys.space = e.code === 'Space'
      
      if (e.code === 'ArrowRight') this.rotationSpeed.ay = this.angleSpeed
      if (e.code === 'ArrowLeft') this.rotationSpeed.ay = -this.angleSpeed
      if (e.code === 'ArrowUp') this.rotationSpeed.az = -this.angleSpeed
      if (e.code === 'ArrowDown') this.rotationSpeed.az = this.angleSpeed
    }

    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === this.root) {
        document.addEventListener('mousemove', mousemoveHandler)
        document.addEventListener('keyup', keyUpListener)
        document.addEventListener('keydown', keyDownListener)
      } else {
        document.removeEventListener('mousemove', mousemoveHandler)
        document.removeEventListener('keyup', keyUpListener)
        document.removeEventListener('keydown', keyDownListener)
      }
    })
    //управление только когда курсор захвачен
    this.root.addEventListener('click', () => {
      this.root.requestPointerLock()
    })
  }
}