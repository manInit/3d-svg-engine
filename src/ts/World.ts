import Polygon from './core/Polygon'
import RenderPipe from './core/RenderPipe'
import { createPolygonElem, getSVGRootElementById } from './utils/svgElements'
import ObjectWorld from './worldObject/ObjectWorld'

export default class World {
  private svgRoot: SVGSVGElement
  private renderPipe: RenderPipe
  private objects: ObjectWorld[]

  constructor(idRoot: string, width: number, height: number, objects: ObjectWorld[]) {
    const elem = getSVGRootElementById(idRoot)
    this.svgRoot = elem

    this.renderPipe = new RenderPipe(width, height)
    this.objects = objects

    this.setPolygonsToObjects(this.objects)
    this.updateRenderPipe()
  }

  public addObject(objects: ObjectWorld[]): void {
    this.setPolygonsToObjects(objects)

    this.objects.push(...objects)
    this.updateRenderPipe()
  }

  public getObjects(): ObjectWorld[] {
    return this.objects
  }

  public getRenderPipe(): RenderPipe {
    return this.renderPipe
  }

  public render(): void {
    this.updateRenderPipe()
    for (const obj of this.objects) {
      obj.render()
    }
  }

  private setPolygonsToObjects(objects: ObjectWorld[]) {
    for (const obj of objects) {
      const svgPolygon = createPolygonElem()
      this.svgRoot.append(svgPolygon)

      const polygon = new Polygon(this.svgRoot, svgPolygon)
      obj.polygon = polygon
    }
  }

  private updateRenderPipe(): void {
    for (let obj of this.objects) {
      obj.renderPipe = this.renderPipe
    }
  }
}