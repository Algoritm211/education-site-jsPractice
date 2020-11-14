import VideoPlayer from './modules/playVideo'
import Slider from './modules/slider'

window.addEventListener('DOMContentLoaded', () => {
  const slider = new Slider('.page', '.next')
  slider.render()
  const video = new VideoPlayer('.showup .play', '.overlay')
  video.init()
})