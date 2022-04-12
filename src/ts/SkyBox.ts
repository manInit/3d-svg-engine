import Camera from './core/Camera'

export default class SkyBox {
  private elem: HTMLElement
  private bgPos: number 
  private imageWidth = 0
  private camera = Camera.getInstance()
  
  constructor(elem: HTMLElement, urlImage: string) {
    this.elem = elem

    this.elem.style.backgroundImage = `url(${urlImage})`
    this.elem.style.backgroundSize = 'cover'
    this.elem.style.backgroundRepeat = 'repeat-x'
    
    this.getWidthImage(urlImage)
  }

  private async getWidthImage(urlImage: string) {
    const img = new Image()
    img.src = urlImage
    try {
      const width = await (new Promise((resolve, reject) => {
        img.onload = () => resolve(img.width)
        img.onerror = () => reject(new Error('Error load image'))
      })) as number
      this.imageWidth = width
    } catch (e) {
      console.error(e.message)
    }
  }

  public updateImage(urlImage: string) {
    this.elem.style.backgroundImage = `url(${urlImage})`
    this.getWidthImage(urlImage)
  }

  public setPostion(bg: number): void {
    this.bgPos = bg 
  }

  public update() {
    this.bgPos = this.imageWidth * this.camera.rotation.ay / 360    
    this.elem.style.backgroundPosition = `${-this.bgPos}px 0px`
  }
}