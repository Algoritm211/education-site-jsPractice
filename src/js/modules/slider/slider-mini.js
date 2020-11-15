import Slider from "./slider"


export default class SliderMini extends Slider {
  constructor({container, next, prev, activeClass, animate, autoplay}) {
    super({container, next, prev, activeClass, animate, autoplay})
  }


  decorateSlides() {
    this.slides.forEach(slide => {
      slide.classList.remove(this.activeClass)
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = 0.4
        slide.querySelector('.card__controls').style.opacity = 0
      }
    })

    //closest возвращает ближайший родительский элемент или себя
    if (!this.slides[0].closest('button')) { 
      this.slides[0].classList.add(this.activeClass)
    }
    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = 1
      this.slides[0].querySelector('.card__controls').style.opacity = 1
    }
  }

  moveButtonsToEnd() {
    this.slides.forEach((slide, index) => {
      if (slide.tagName === 'BUTTON') {
        this.container.appendChild(this.slides[index])
      }
    })
  }

  nextSlide() {
      this.container.appendChild(this.slides[0])
      this.decorateSlides()
      this.moveButtonsToEnd()
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide())

    this.prev.addEventListener('click', () => {
      let active = this.slides[0]
      this.container.insertBefore(active, this.slides[length - 1])
      this.decorateSlides()
      this.moveButtonsToEnd()
    })
  }

  init() {
    try { 
      this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start
      `
  
      this.bindTriggers()
      this.decorateSlides()
  
      if (this.autoplay) {
        setInterval(() => this.nextSlide(), 5000)
      }
    } catch (error) {}
  }
}