import './engine'

requestAnimationFrame(function update() {
  window.world.render()

  if (window.map)
    window.map.render()
  window.camera.update()

  requestAnimationFrame(update)
})