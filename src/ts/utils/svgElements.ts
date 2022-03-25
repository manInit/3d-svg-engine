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
  createSVGElem
}