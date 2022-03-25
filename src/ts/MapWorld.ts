import Point from './core/Point'
import Polygon from './core/Polygon'
import RenderPipe from './core/RenderPipe'
import World from './World'
import ObjectWorld from './worldObject/ObjectWorld'
import RenderPipeMap from './core/RenderPipeMap'
import Camera from './core/Camera'
import Transform from './core/Transform'
import { createCircleElem, createPolygonElem, getSVGRootElementById } from './utils/svgElements'

export default class MapWorld {
  private world: World
  private objects: ObjectWorld[]
  private cameraObject: SVGCircleElement
  private cameraDirection: ObjectWorld
  private camera: Camera
  private renderPipe: RenderPipe

  constructor(idRoot: string, width: number, height: number, world: World) {
    const elem = getSVGRootElementById(idRoot)
    elem.style.width = `${width}px`
    elem.style.height = `${height}px`

    this.renderPipe = new RenderPipeMap(width, height)
    this.camera = Camera.getInstance()

    this.world = world
    this.objects = []

    this.cameraObject = createCircleElem(0, 0, 3)
    elem.append(this.cameraObject)

    const svgPolygon = createPolygonElem()
    elem.append(svgPolygon)
    const polygon = new Polygon(elem, svgPolygon)
    this.cameraDirection = new ObjectWorld([], polygon)
    this.cameraDirection.renderPipe = this.renderPipe
    
    for (let i = 0; i < this.world.getObjects().length; i++) {
      const svgPolygon = createPolygonElem()
      elem.append(svgPolygon)
      const polygon = new Polygon(elem, svgPolygon)
      this.objects.push(new ObjectWorld([], polygon))
    }
  }

  public render(): void {
    this.updateRenderPipe()
    for (const [index, obj] of this.world.getObjects().entries()) {
      const objPoints: Point[] = []
      for (const point of obj.points) {
        objPoints.push({
          x: point.x,
          y: point.z,
          z: 0
        })
      }

      this.objects[index].color = obj.color
      this.objects[index].points = objPoints
      this.objects[index].render()
    }

    this.renderCamera()
  }

  private renderCamera(): void {
    this.renderCameraPoint()
    this.renderCameraDirection()
  }

  private renderCameraDirection(): void {
    const point = Transform.translate(this.camera.position, -this.camera.position.x, -this.camera.position.y, -this.camera.position.z)
    let dirPoints = [{
      x: point.x,
      y: point.y,
      z: point.z
    }, {
      x: point.x,
      y: point.y,
      z: point.z + 200
    }]
    
    for (let i = 0; i < dirPoints.length; i++) {
      dirPoints[i] = Transform.rotateX(dirPoints[i], -this.camera.rotation.ax)
      dirPoints[i] = Transform.rotateY(dirPoints[i], -this.camera.rotation.ay)
      dirPoints[i] = Transform.rotateZ(dirPoints[i], -this.camera.rotation.az)
      
      dirPoints[i] = Transform.translate(dirPoints[i], this.camera.position.x, this.camera.position.y, this.camera.position.z)
      dirPoints[i].y = dirPoints[i].z
    }
    
    this.cameraDirection.points = dirPoints
    this.cameraDirection.render()
  }

  private renderCameraPoint(): void{
    const point = Transform.translate(this.camera.position, 0, 0, 0)
    point.y = point.z
    const cameraPoint = this.renderPipe.render([point])[0]
    this.cameraObject.setAttribute('cx', cameraPoint.x.toString())
    this.cameraObject.setAttribute('cy', cameraPoint.y.toString())
  }

  private updateRenderPipe(): void {
    for (let obj of this.objects) {
      obj.renderPipe = this.renderPipe
    }
  }
}