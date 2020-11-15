export default class Difference {
  constructor (oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer)
      this.newOfficer = document.querySelector(newOfficer)
      
      this.oldItems = this.oldOfficer.querySelectorAll(items)
      this.newItems = this.newOfficer.querySelectorAll(items)
      this.oldCounter = 0
      this.newCounter = 0
    } catch (error) {}
  }

  bindTriggers(container, items, counter) {
    container.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = 'flex'
        counter += 1
      } else {
        items[counter].style.display = 'flex'
        items[items.length - 1].classList.add('animated', 'fadeOutDown')
        items[items.length - 1].display = 'none'
      }
    })
  }

  hideItems(items) {
    items.forEach((item, index, arr) => {
      if (index !== arr.length - 1) {
        item.style.display = 'none'
      }
    })
  }

  init() {
    try {
      this.hideItems(this.oldItems)
      this.hideItems(this.newItems)
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter)
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter) 
    } catch (error) {}
  }
}