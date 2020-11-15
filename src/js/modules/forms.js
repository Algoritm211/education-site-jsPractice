export default class Form {
  constructor(formSelector) {
    this.forms = document.querySelectorAll(formSelector)
    this.inputs = document.querySelectorAll('input')
    this.message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с Вами свяжемся',
      failure: 'Что-то пошло не так',
      // spinner: 'assets/img/spinner.gif',
      // ok: 'assets/img/ok.png',
      // fail: 'assets/img/fail.png'
    }
  
    this.path = {
      question: 'assets/question.php'
    }
  }

  clearInputs() {
    this.inputs.forEach(item => {
      item.value = ''
    })
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]')
  
    mailInputs.forEach(input => {
      input.addEventListener('keypress', function(event) {
        if (event.key.match(/[^a-z 0-9 @ \.]/ig)) {
          event.preventDefault()
        }
      })
    })
  }

  initMask() {
    const setCursonPosition = (position, elem) => {
      elem.focus()
  
      if (elem.setSelectionRange) {
        elem.setSelectionRange(position, position)
      } else if (elem.createTextRange) {
        let range = elem.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    }
    
    function createMask(event) {
      let matrix = '+1 (___) ___ - ____'
      let iterator = 0
      let def = matrix.replace(/\D/g, '')
      let val = this.value.replace(/\D/g, '')
  
      if (def.length >= val.length) {
        val = def
      }
  
      this.value = matrix.replace(/./g, function(symbol) {
        return /[_\d]/.test(symbol) && iterator < val.length ? val.charAt(iterator++) : iterator >= val.length ? '' : symbol
      })
  
      // console.log(this);
  
      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = ''
        }
      } else {
        setCursonPosition(this.value.length, this)
      }
    }
  
    let inputs = document.querySelectorAll('[name="phone"]')
    
    inputs.forEach(input => {
      input.addEventListener('input', createMask)
      input.addEventListener('focus', createMask)
      input.addEventListener('blur', createMask)
    })
  }


  async postData(url, data) {
    let res = await fetch(url, {
      method: 'POST',
      body: data
    })

    if (!res.ok) {
      throw new Error(`Could not fetch data, url: ${url}, status: ${res.status}`)
    }

    return await res.text()
  }

  init() {
    this.checkMailInputs()
    this.initMask()
    this.forms.forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault()

        let statusMessage = document.createElement('div')
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          solor: grey;
        `
        form.parentNode.appendChild(statusMessage)

        statusMessage.textContent = this.message.loading
        const formData = new FormData(form)

        this.postData(this.path.question, formData)
          .then(data => {
            console.log(data)
            statusMessage.textContent = this.message.success
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure
          })
          .finally(data => {
            this.clearInputs()
            setTimeout(() => {
              statusMessage.remove()
            }, 4000)
          })
      })
    })
  }
}