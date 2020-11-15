import Difference from './modules/difference'
import Form from './modules/forms'
import VideoPlayer from './modules/playVideo'
import MainSlider from './modules/slider/slider-main'
import SliderMini from './modules/slider/slider-mini'

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({
    container: '.page',
    buttons: '.next'
  })
  slider.render()

  const blockSlider = new MainSlider({
    container: '.moduleapp',
    buttons: '.next'
  })
  blockSlider.render()

  const showUpSlider = new SliderMini({
    container: '.showup__content-slider',
    next: '.showup__next',
    prev: '.showup__prev',
    activeClass: 'card-active',
    animate: true
  })
  showUpSlider.init()

  const modulesSlider = new SliderMini({
    container: '.modules__content-slider',
    next: '.modules__info-btns .slick-next',
    prev: '.modules__info-btns .slick-prev',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  })
  modulesSlider.init()

  const feedSlider = new SliderMini({
    container: '.feed__slider',
    next: '.feed__slider .slick-next',
    prev: '.feed__slider .slick-prev',
    activeClass: 'feed__item-active',
  })
  feedSlider.init()

  const video = new VideoPlayer('.showup .play', '.overlay')
  video.init()
  const videoPlayerWithBlock = new VideoPlayer('.module__video-item .play', '.overlay')
  videoPlayerWithBlock.init()

  const difference = new Difference('.officerold', '.officernew', '.officer__card-item')
  difference.init()

  const form = new Form('.form')
  form.init()
})