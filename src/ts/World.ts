import Polygon from './core/Polygon'
import RenderPipe from './core/RenderPipe'
import { createPolygonElem, createSVGElem } from './utils/svgElements'
import ObjectWorld from './worldObject/ObjectWorld'
import SkyBox from './SkyBox'
import ComplexObject from './worldObject/ComplexObject'

export default class World {
  private worldRoot: HTMLElement
  private renderPipe: RenderPipe
  private objects: ObjectWorld[]
  public skyBox: SkyBox

  constructor(idRoot: string, width: number, height: number, objects: ObjectWorld[]) {
    const elem = document.getElementById(idRoot)
    this.worldRoot = elem

    this.renderPipe = new RenderPipe(width, height)
    this.objects = objects
    this.skyBox = new SkyBox(this.worldRoot, './textures/sky.png')

    this.setPolygonsToObjects(this.objects)
    this.updateRenderPipe()
  }

  public add(complexObjects: ComplexObject[]): void {
    for (const obj of complexObjects) {
      if (!obj.sides) continue

      this.addObjects(obj.sides)
    }
  }

  public addObjects(objects: ObjectWorld[]): void {
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
    this.skyBox.update()
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
  }

  private updateRenderPipe(): void {
    for (let obj of this.objects) {
      obj.renderPipe = this.renderPipe
    }
  }
}