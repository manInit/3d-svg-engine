const createPolygonElem = (): SVGPolygonElement => {
  const svgPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  return svgPolygon
}

const createCircleElem = (cx: number, cy: number, r: number): SVGCircleElement => {
  const svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  svgCircle.setAttribute('cx', cx.toString())
  svgCircle.setAttribute('cy', cy.toString())
  svgCircle.setAttribute('r', r.toString())

  return svgCircle
}

const createTextureElement = (urlTexture: string, id: string): SVGDefsElement => {
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')

  const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern')
  pattern.id = id
  pattern.setAttribute('patternContentUnits', 'objectBoundingBox')
  pattern.setAttribute('height', '100%')
  pattern.setAttribute('width', '100%')
  pattern.setAttribute('x', '0')
  pattern.setAttribute('y', '0')
  pattern.setAttribute('preserveAspectRatio', 'xMidYMid meet')

  const image = document.createElementNS('http://www.w3.org/2000/svg', 'image')
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', urlTexture)
  image.setAttribute('width', '1')
  image.setAttribute('height', '1')
  image.setAttribute('preserveAspectRatio', 'none')
  
  pattern.append(image)
  defs.append(pattern)
  
  return defs
}

const createSVGElem = (): SVGSVGElement => {
  const elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  if (!(elem instanceof SVGSVGElement))
    throw new Error('Expected svg root elem')

  return elem
}

const getSVGRootElementById = (id: string): SVGSVGElement => {
  const elem = document.getElementById(id)
  if (!(elem instanceof SVGSVGElement))
    throw new Error('Expected svg root elem')

  return elem
}

export {
  createPolygonElem,
  createCircleElem,
  getSVGRootElementById,
  createSVGElem,
  createTextureElement
}