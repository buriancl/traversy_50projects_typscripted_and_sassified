const buttons = document.querySelectorAll('.ripple')

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (
      e instanceof MouseEvent &&
      e.target != null &&
      e.target instanceof HTMLElement
    ) {
      const x: number = e.clientX
      const y: number = e.clientY

      const buttonTop = e.target.offsetTop
      const buttonLeft = e.target.offsetLeft

      const xInside = x - buttonLeft
      const yInside = y - buttonTop

      const circle = document.createElement('span')
      circle.classList.add('circle')
      circle.style.top = yInside + 'px'
      circle.style.left = xInside + 'px'

      button.appendChild(circle)
      console.log(button)

      setTimeout(() => circle.remove(), 500)
    }
  })
})
