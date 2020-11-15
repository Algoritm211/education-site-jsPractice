export default class ShowInfo {
  constructor(triggersSelector) {
    this.buttons = document.querySelectorAll(triggersSelector)
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        const sibling = button.closest('.module__info-show').nextElementSibling
        // console.log(button.closest('.module__info-show').nextElementSibling);
        sibling.classList.add('animated', 'fadeIn')
        sibling.style.display = 'block'
        button.classList.add('animated', 'fadeOutTopRight')
        button.closest('.module__info-show').style.display = 'none'
      })
    })
  }
}