import Point from './Point'
import { degToRad } from '../utils/angle'
import Camera from './Camera'

export default class Transform {
  public static translate(point: Point, x: number, y: number, z: number): Point {
    return {
      x: point.x + x,
      y: point.y + y,
      z: point.z + z
    }
  }

  public static scale(point: Point, sx: number, sy: number, sz: number): Point {
    return {
      x: point.x * sx,
      y: point.y * sy,
      z: point.z * sz
    }
  }

  public static perspective(point: Point): Point {
    const z0 = Camera.getInstance().z0

    return {
      x: point.x * z0 / point.z,
      y: point.y * z0 / point.z,
      z: 0
    }
  }

  public static rotateX(point: Point, a: number): Point {
    const rad = degToRad(a)
    return {
      x: point.x,
      y: point.y * Math.cos(rad) + point.z * Math.sin(rad),
      z: -point.y * Math.sin(rad) + point.z * Math.cos(rad)
    }
  }

  public static rotateY(point: Point, a: number): Point {
    const rad = degToRad(a)
    return {
      x: point.x * Math.cos(rad) - point.z * Math.sin(rad),
      y: point.y,
      z: point.x * Math.sin(rad) + point.z * Math.cos(rad)
    }
  }

  public static rotateZ(point: Point, a: number): Point {
    const rad = degToRad(a)
    return {
      x: point.x * Math.cos(rad) + point.y * Math.sin(rad),
      y: -point.x * Math.sin(rad) + point.y * Math.cos(rad),
      z: point.z
    }
  }
}