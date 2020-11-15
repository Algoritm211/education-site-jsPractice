export default class Download {
  constructor(triggers) {
    this.buttons = document.querySelectorAll(triggers)
    this.path = 'assets/img/mainbg.jpg'
  }

  downloadItem(path) {
    const element = document.createElement('a')
    element.setAttribute('href', path)
    element.setAttribute('download', 'nice_pictire')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()

    document.body.removeChild(element)
  } 

  init() {
    this.buttons.forEach(item => {
      item.addEventListener('click', (event) => {
        event.stopPropagation()
        this.downloadItem(this.path)
      })
    })
  }
  
}