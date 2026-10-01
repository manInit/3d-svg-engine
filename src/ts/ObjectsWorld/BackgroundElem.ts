export default class BackgroundElem {
  public width = 0
  public x: number
  private xStart: number
  public y: number
  public src: string

  constructor(urlImage: string, xStart: number, y: number) {
    const image = new Image()
    this.src = urlImage
    this.x = xStart
    this.xStart = xStart
    this.y = y

    image.addEventListener('load', () => {
      this.width = image.width
    })
    image.src = urlImage
  }

  public update(rootWidth: number, ay: number) {
    const maxBgPos = this.width + rootWidth
    this.x = this.xStart + ((ay * maxBgPos) / 360) * 3
  }

  get styleBg() {
    return `url("${this.src}") ${-this.x}px ${this.y}px no-repeat`
  }
}
