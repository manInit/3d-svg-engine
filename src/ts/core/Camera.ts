import { degToRad } from '../utils/angle'
import Point from './Point'

export default class Camera {
  public position: Point = { x: 0, y: 0, z: 0 }
  public rotation = { ax: 0, ay: 0, az: 0 }
  private speedVec = { x: 0, y: 0, z: 0 }
  private rotateVec = { x: 0, y: 0, z: 0 }
  public fov = 90
  public zFar = 10000
  public width: number
  public z0: number

  public speed = 5
  public angleSpeed = 3
  private static instance: Camera

  private constructor(width: number) { 
    const fov = degToRad(this.fov)
    const farWidth = 2 * this.zFar * Math.tan(fov / 2)
    this.z0 = this.zFar * width / farWidth

    this.setControls()
  }

  public static getInstance(width?: number) {
    if (!Camera.instance) {
      Camera.instance = new Camera(width ?? 500)
    }
    
    return Camera.instance
  }

  private setControls() {
    document.addEventListener('keydown', e => {
      if (e.key === 'w' || e.key === 'W') this.speedVec.z = this.speed
      if (e.key === 's' || e.key === 'S') this.speedVec.z = -this.speed
      if (e.key === 'a' || e.key === 'A') this.speedVec.x = -this.speed
      if (e.key === 'd' || e.key === 'D') this.speedVec.x = this.speed

      if (e.key === 'ArrowRight') this.rotateVec.y = this.angleSpeed
      if (e.key === 'ArrowLeft') this.rotateVec.y = -this.angleSpeed
    })

    document.addEventListener('keyup', e => {
      if (e.key === 'w' || e.key === 'W') this.speedVec.z = 0
      if (e.key === 's' || e.key === 'S') this.speedVec.z = 0
      if (e.key === 'a' || e.key === 'A') this.speedVec.x = 0
      if (e.key === 'd' || e.key === 'D') this.speedVec.x = 0

      if (e.key === 'ArrowRight') this.rotateVec.y = 0
      if (e.key === 'ArrowLeft') this.rotateVec.y = 0
    })
  }

  public update() {
    this.position.x += this.speedVec.x
    this.position.y += this.speedVec.y
    this.position.z += this.speedVec.z

    this.rotation.ax += this.rotateVec.x
    this.rotation.ay += this.rotateVec.y
    this.rotation.az += this.rotateVec.z
  }

  public setSpeed(speed: number, angleSpeed: number) {
    this.speed = speed
    this.angleSpeed = angleSpeed
  }

}