export interface RGB {
  r: number
  g: number
  b: number
}

const namedColors: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#008000',
  lime: '#00ff00',
  blue: '#0000ff',
  yellow: '#ffff00',
  orange: '#ffa500',
  purple: '#800080',
  magenta: '#ff00ff',
  fuchsia: '#ff00ff',
  cyan: '#00ffff',
  aqua: '#00ffff',
  pink: '#ffc0cb',
  brown: '#a52a2a',
  gray: '#808080',
  grey: '#808080',
  silver: '#c0c0c0',
  gold: '#ffd700',
  navy: '#000080',
  teal: '#008080',
  maroon: '#800000',
  olive: '#808000',
}

const cache = new Map<string, RGB | null>()

const parseHex = (hex: string): RGB | null => {
  let h = hex.slice(1)
  if (h.length === 3 || h.length === 4)
    h = h
      .slice(0, 3)
      .split('')
      .map((c) => c + c)
      .join('')
  else if (h.length === 8) h = h.slice(0, 6)
  if (h.length !== 6 || !/^[0-9a-f]{6}$/i.test(h)) return null

  const n = parseInt(h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

//остальные CSS-цвета (hsl(), редкие имена) разбирает браузер через canvas
const parseWithCanvas = (color: string): RGB | null => {
  if (typeof document === 'undefined' || typeof navigator === 'undefined' || /jsdom/i.test(navigator.userAgent))
    return null

  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return null

  ctx.fillStyle = '#010203'
  ctx.fillStyle = color
  const normalized = String(ctx.fillStyle)
  if (normalized === '#010203' && color.replace(/\s/g, '') !== '#010203') return null
  return parseColorUncached(normalized, false)
}

const parseColorUncached = (color: string, allowCanvas: boolean): RGB | null => {
  const c = color.trim().toLowerCase()
  if (c in namedColors) return parseHex(namedColors[c])
  if (c.startsWith('#')) return parseHex(c)

  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(c)
  if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3] }

  if (c === 'none' || c === 'transparent' || c.startsWith('url(')) return null
  return allowCanvas ? parseWithCanvas(c) : null
}

/** Разбирает CSS-цвет в RGB. Для 'none', текстур и нераспознанных значений возвращает null. */
const parseColor = (color: string): RGB | null => {
  let result = cache.get(color)
  if (result === undefined) {
    result = parseColorUncached(color, true)
    cache.set(color, result)
  }
  return result
}

const clamp255 = (v: number) => Math.max(0, Math.min(255, Math.round(v)))

const toCss = ({ r, g, b }: RGB): string => `rgb(${clamp255(r)},${clamp255(g)},${clamp255(b)})`

const mix = (a: RGB, b: RGB, t: number): RGB => ({
  r: a.r + (b.r - a.r) * t,
  g: a.g + (b.g - a.g) * t,
  b: a.b + (b.b - a.b) * t,
})

export { parseColor, toCss, mix }
