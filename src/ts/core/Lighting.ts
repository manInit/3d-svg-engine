import type Point from './Point'
import { mix, parseColor, type RGB } from '../utils/color'
import { dot, normalize } from '../utils/vector'

export interface LightOptions {
  /** направление НА источник света (свет падает с этой стороны) */
  direction: Point
  color: string
  /** сила рассеянного (диффузного) света */
  intensity: number
  /** фоновая подсветка, чтобы теневые грани не были чёрными */
  ambient: number
  /** сила бликов по Блинну — Фонгу, 0 — без бликов */
  specular: number
  shininess: number
}

export interface FogOptions {
  color: string
  /** с этой дистанции начинается туман */
  near: number
  /** на этой дистанции цвет полностью равен цвету тумана */
  far: number
}

export const defaultLight: LightOptions = {
  direction: { x: -0.4, y: 1, z: -0.6 },
  color: '#ffffff',
  intensity: 0.75,
  ambient: 0.3,
  specular: 0.15,
  shininess: 24,
}

export interface Light {
  direction: Point
  color: RGB
  intensity: number
  ambient: number
  specular: number
  shininess: number
}

export interface Fog {
  color: RGB
  near: number
  far: number
}

/** Всё, что нужно полигону для расчёта цвета в текущем кадре. */
export interface Environment {
  light: Light | null
  fog: Fog | null
  cameraPosition: Point
}

const white: RGB = { r: 255, g: 255, b: 255 }

export const createLight = (options: LightOptions): Light => ({
  ...options,
  direction: normalize(options.direction),
  color: parseColor(options.color) ?? white,
})

export const createFog = (options: FogOptions): Fog => ({
  color: parseColor(options.color) ?? white,
  near: options.near,
  far: Math.max(options.far, options.near + 1e-6),
})

/**
 * Плоское затенение грани.
 * normal и toCamera — единичные векторы в мировых координатах.
 */
export const shade = (base: RGB, normal: Point, toCamera: Point, light: Light): RGB => {
  const diffuse = Math.max(0, dot(normal, light.direction)) * light.intensity
  const k = light.ambient + diffuse

  let spec = 0
  if (light.specular > 0 && diffuse > 0) {
    const half = normalize({
      x: light.direction.x + toCamera.x,
      y: light.direction.y + toCamera.y,
      z: light.direction.z + toCamera.z,
    })
    spec = light.specular * Math.max(0, dot(normal, half)) ** light.shininess * 255
  }

  return {
    r: (base.r * light.color.r * k) / 255 + spec,
    g: (base.g * light.color.g * k) / 255 + spec,
    b: (base.b * light.color.b * k) / 255 + spec,
  }
}

/** Доля тумана (0 — нет, 1 — цвет полностью съеден) для дистанции distance. */
export const fogFactor = (distance: number, fog: Fog): number =>
  Math.max(0, Math.min(1, (distance - fog.near) / (fog.far - fog.near)))

export const applyFog = (color: RGB, factor: number, fog: Fog): RGB =>
  factor > 0 ? mix(color, fog.color, factor) : color
