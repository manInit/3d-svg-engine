import Polygon from './core/Polygon'
import RenderPipe from './core/RenderPipe'
import { createPolygonElem, createSVGElem } from './utils/svgElements'
import ObjectWorld from './worldObject/ObjectWorld'

export default class World {
  private worldRoot: HTMLElement
  private renderPipe: RenderPipe
  private objects: ObjectWorld[]

  constructor(idRoot: string, width: number, height: number, objects: ObjectWorld[]) {
    const elem = document.getElementById(idRoot)
    this.worldRoot = elem

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
      obj.render(true)
    }
  }

  private setPolygonsToObjects(objects: ObjectWorld[]): void{
    for (const obj of objects) {
      const svgRoot = createSVGElem()
      this.worldRoot.append(svgRoot)

      const svgPolygon = createPolygonElem()
      svgRoot.append(svgPolygon)

      const polygon = new Polygon(svgRoot, svgPolygon)
      obj.polygon = polygon
    }

    objects[0].polygon.setTexture('./textures/brick.png')
  }

  private updateRenderPipe(): void {
    for (let obj of this.objects) {
      obj.renderPipe = this.renderPipe
    }
  }
}