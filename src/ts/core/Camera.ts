import { degToRad } from '../utils/angle'
import Point from './Point'

export default class Camera {
  public position: Point = { x: 0, y: 0, z: 0 }
  public rotation = { ax: 0, ay: 0, az: 0 }
  public fov = 45
  public zFar = 10000
  public width: number
  public z0: number
  public speed
  public startSpeed = 5
  public angleSpeed = 2

  private speedVec = { x: 0, y: 0, z: 0 }
  private rotateVec = { x: 0, y: 0, z: 0 }
  //максимальный угол обзора вверх/вниз
  // private maxAngle = 70
  private static instance: Camera
  private keys = {
    w: false,
    s: false,
    a: false,
    d: false,
    shift: false
  }

  private constructor(width: number) { 
    const fov = degToRad(this.fov)
    const farWidth = 2 * this.zFar * Math.tan(fov / 2)
    this.z0 = this.zFar * width / farWidth
    this.speed = this.startSpeed

    this.setControls()
  }

  public static getInstance(width?: number) {
    if (!Camera.instance) Camera.instance = new Camera(width ?? 500)
    
    return Camera.instance
  }

  public setSpeed(speed: number, angleSpeed: number) {
    this.speed = speed
    this.startSpeed = speed
    this.angleSpeed = angleSpeed
  }

  public update() {
    this.updateSpeed()

    this.position.x += this.speedVec.x
    this.position.y += this.speedVec.y
    this.position.z += this.speedVec.z

    this.rotation.ax += this.rotateVec.x
    this.rotation.ay += this.rotateVec.y

    //ограничение на угол обзора вверх и вниз
    // if (this.rotation.az > -this.maxAngle && this.rotateVec.z < 0 || 
    //     this.rotation.az < this.maxAngle && this.rotateVec.z > 0)
    this.rotation.az += this.rotateVec.z
  }

  private setControls() {
    document.addEventListener('keydown', e => {
      if (!this.keys.w) this.keys.w = e.code === 'KeyW'
      if (!this.keys.s) this.keys.s = e.code === 'KeyS'
      if (!this.keys.a) this.keys.a = e.code === 'KeyA'
      if (!this.keys.d) this.keys.d = e.code === 'KeyD'
      if (!this.keys.shift) this.keys.shift = e.code === 'ShiftLeft'
      
      if (e.code === 'ArrowRight') this.rotateVec.y = this.angleSpeed
      if (e.code === 'ArrowLeft') this.rotateVec.y = -this.angleSpeed
      if (e.code === 'ArrowUp') this.rotateVec.z = -this.angleSpeed
      if (e.code === 'ArrowDown') this.rotateVec.z = this.angleSpeed
    })

    //по клику делаем захват
    document.querySelector('#world').addEventListener('click', () => {
      document.querySelector('#world').requestPointerLock()
    })
    
    document.addEventListener('mousemove', e => {
      this.rotation.ay += e.movementX / 10
      this.rotation.az += e.movementY / 10
    })

    document.addEventListener('keyup', e => {
      if (this.keys.w && e.code === 'KeyW') this.keys.w = false
      if (this.keys.s && e.code === 'KeyS') this.keys.s = false
      if (this.keys.a && e.code === 'KeyA') this.keys.a = false
      if (this.keys.d && e.code === 'KeyD') this.keys.d = false
      if (this.keys.shift && e.code === 'ShiftLeft') this.keys.shift = false
      
      if (e.key === 'ArrowRight') this.rotateVec.y = 0
      if (e.key === 'ArrowLeft') this.rotateVec.y = 0
      if (e.code === 'ArrowUp') this.rotateVec.z = 0
      if (e.code === 'ArrowDown') this.rotateVec.z = 0
    })
  }

  private updateSpeed() {
    const vec = { x: 0, y: 0, z: 0 }
    
    if (this.keys.shift) this.speed += 2
    else this.speed = this.startSpeed

    if (this.keys.w) {
      vec.x += this.speed * Math.sin(degToRad(this.rotation.ay))
      vec.z += this.speed * Math.cos(degToRad(this.rotation.ay))

      vec.y += -this.speed * Math.sin(degToRad(this.rotation.az))
    } 
    if (this.keys.s) {
      vec.x += -this.speed * Math.sin(degToRad(this.rotation.ay))
      vec.z += -this.speed * Math.cos(degToRad(this.rotation.ay))
      
      vec.y += this.speed * Math.sin(degToRad(this.rotation.az))
    }
    if (this.keys.a) {
      vec.x += -this.speed * Math.cos(degToRad(this.rotation.ay))
      vec.z += this.speed * Math.sin(degToRad(this.rotation.ay))
    }
    if (this.keys.d) {
      vec.x += this.speed * Math.cos(degToRad(this.rotation.ay))
      vec.z += -this.speed * Math.sin(degToRad(this.rotation.ay))
    }

    this.speedVec = vec
  }
}