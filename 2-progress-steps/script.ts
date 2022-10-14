const progress = document.getElementById('progress') as HTMLDivElement
const prev = document.getElementById('prev') as HTMLButtonElement
const next = document.getElementById('next') as HTMLButtonElement
const circles = document.querySelectorAll<HTMLDivElement>('.circle')
const containerEl = document.querySelector<HTMLDivElement>('.container')

let currentActive: number = 1

next?.addEventListener('click', () => {
  currentActive++
  if (currentActive > circles.length) {
    currentActive = circles.length
  }
  update()
})

prev?.addEventListener('click', () => {
  currentActive--
  if (currentActive < 1) {
    currentActive = 1
  }
  update()
})

const update = () => {
  circles.forEach((circle, i) => {
    if (i < currentActive) {
      circle.classList.add('active')
    } else {
      circle.classList.remove('active')
    }
  })

  const actives = document.querySelectorAll('.active')

  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + '%'

  if (currentActive === 1) {
    prev.disabled = true
    removeMessage()
  } else if (currentActive === circles.length) {
    next.disabled = true
    displayMessage()
  } else {
    prev.disabled = false
    next.disabled = false
    removeMessage()
  }
}

function displayMessage() {
  const messageEl = document.createElement('p')
  messageEl.classList.add('complete-message')
  messageEl.innerText = 'Complete!'
  containerEl?.prepend(messageEl)
}

function removeMessage() {
  const messageEl =
    document.querySelector<HTMLParagraphElement>('.complete-message')
  messageEl?.remove()
}
