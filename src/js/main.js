import VideoPlayer from './modules/playVideo'
import MainSlider from './modules/slider/slider-main'

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({
    page: '.page',
    buttons: '.next'
  })
  slider.render()
  const video = new VideoPlayer('.showup .play', '.overlay')
  video.init()
})