import Slider from "./slider";


export default class MainSlider extends Slider {
  constructor ({container, buttons}) {
    super({container, buttons})
  }

  showSlides(itemIndex) {
    if (itemIndex > this.slides.length) {
      this.slideIndex = 1
    }

    if (itemIndex < 1) {
      this.slideIndex = this.slides.length
    }

    try {
      this.hanson.style.opacity = 0
      if (itemIndex === 3) {
        this.hanson.classList.add('animated')
        setTimeout(() => {
          this.hanson.style.opacity = 1
          this.hanson.classList.add('slideInUp')
        }, 3000)
      } else {
        this.hanson.classList.remove('slideInUp')
      }
    } catch (error) {}


    this.slides.forEach(slide => {
      slide.style.display = 'none'
    })
    
    this.slides[this.slideIndex - 1].style.display = 'block'
  }

  changeSlides(itemIndex) {
    this.showSlides(this.slideIndex += itemIndex)
  }

  render() {
    this.hanson = document.querySelector('.hanson')
    this.buttons.forEach(item => {
      item.addEventListener('click', () => {
        this.changeSlides(1)
      })

      item.parentNode.previousElementSibling.addEventListener('click', (event) => {
        event.preventDefault()
        this.slideIndex = 1
        this.showSlides(this.slideIndex)
      })
    })

    this.showSlides(this.slideIndex)
  }
}