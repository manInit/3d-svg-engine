import Camera from './core/Camera'

export default class SkyBox {
  private elem: HTMLElement
  private bgPos: number 
  private imagePos: number
  private camera = Camera.getInstance()
  private imageWidth: number
  
  constructor(elem: HTMLElement, urlImage: string[]) {
    this.elem = elem
    const bg = urlImage.reduce((prev, url) => prev += `url(${url}), `, '')
    console.log(bg)
    this.elem.style.backgroundImage = bg.slice(0, -2) 
    this.elem.style.backgroundSize = '25%, cover'
    this.elem.style.backgroundRepeat = 'no-repeat, repeat-x'

    this.imageWidth = 2048
  }

  public setPostion(bg: number, image: number): void {
    this.bgPos = bg 
    this.imagePos = image
  }

  public update() {
    this.bgPos = this.imageWidth * this.camera.rotation.ay / 360
    this.imagePos = 2 * this.bgPos
    this.elem.style.backgroundPosition = `${-this.imagePos}px 50%, ${-this.bgPos}px 0px`
    console.log(this.elem.style.backgroundPosition)
  }
}