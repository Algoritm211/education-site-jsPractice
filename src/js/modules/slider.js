class Slider {

  constructor(page, buttons) {
    this.page = document.querySelector(page)
    this.slides = this.page.children
    this.buttons = document.querySelectorAll(buttons)
    this.slideIndex = 1
  }

  showSlides(itemIndex) {
    if (itemIndex > this.slides.length) {
      this.slideIndex = 1
    }

    if (itemIndex < 1) {
      this.slideIndex = this.slides.length
    }

    this.slides.forEach(slide => {
      slide.style.display = 'none'
    })
    
    this.slides[this.slideIndex - 1].style.display = 'block'
  }

  changeSlides(itemIndex) {
    this.showSlides(this.slideIndex += itemIndex)
  }

  render() {
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


export default Slider