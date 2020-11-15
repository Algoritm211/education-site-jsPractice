class VideoPlayer {
  constructor (triggers, overlay) {
    this.buttons = document.querySelectorAll(triggers)
    this.overlay = document.querySelector(overlay)
    this.close = this.overlay.querySelector('.close')
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    // Привязываем контекст потому что new YT.Player меняет его
  }

  bindTriggers() {

    this.buttons.forEach((button, index) => {
      try {
        const blockedElem = button.closest('.module__video-item').nextElementSibling
        if (index % 2 === 0) {
          blockedElem.setAttribute('data-disabled', 'true')
        }
      } catch (error) {}
      // console.log(button);
      button.addEventListener('click', () => {
        if (!button.closest('.module__video-item') || button.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeButton = button
          // Если плеер уже существует, то просто открываем окно без создания плеера
          // Если плеера еще нет, то вызываем createPlayer и создаем новый плеер вместо <div id="frame"></div>
          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex'
            // Условие для того, чтобы не создавать новый плеер, а вставлять новое видео в существующий
            if (this.path !== button.getAttribute('data-url')) {
              this.path = button.getAttribute('data-url')
              this.player.loadVideoById({videoId: this.path}) // See YouTube API
            }
          } else {
            this.path = button.getAttribute('data-url')
            this.createPlayer(this.path)
          }
        }
      })
    })
  }

  bindCloseBtn() {
    this.close.addEventListener('click',() => {
      this.overlay.style.display = 'none'
      this.player.stopVideo()
    })
  }

  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });

    // console.log(this.player);
    this.overlay.style.display = 'flex'
  }

  onPlayerStateChange(event) {
    try {
    const blockedElem = this.activeButton.closest('.module__video-item').nextElementSibling
    const svgPlay = this.activeButton.querySelector('svg').cloneNode(true) // Ставим true для глубокого копирования

    if (event.data === 0) {
      // Условие потому что человек может нажать на первое видео еще раз и classList.remove() может выдать ошибку
      if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
        blockedElem.querySelector('.play__circle').classList.remove('closed')
        blockedElem.querySelector('svg').remove()
        blockedElem.querySelector('.play__circle').appendChild(svgPlay)
        blockedElem.querySelector('.play__text').textContent = 'Play video'
        blockedElem.querySelector('.play__text').classList.remove('attention')
        blockedElem.style.opacity = 1
        blockedElem.style.filter = 'none'

        blockedElem.setAttribute('data-disabled', 'false')

      }
    }
    } catch (error) {}
  }

  init() {
    if (this.buttons.length > 0) {
      const tag = document.createElement('script');
  
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers()
      this.bindCloseBtn()
    }
  }


}


export default VideoPlayer