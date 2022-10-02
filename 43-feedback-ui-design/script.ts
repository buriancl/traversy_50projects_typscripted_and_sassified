const ratings = document.querySelectorAll<HTMLDivElement>('.rating')
const ratingsContainer =
  document.querySelector<HTMLDivElement>('.ratings-container')
const sendBtn = document.querySelector<HTMLButtonElement>('#send')
const panel = document.querySelector<HTMLDivElement>('#panel')

let selectedRating: string = 'Satisfied'

ratingsContainer?.addEventListener('click', (e) => {
  const clickedTarget = e.target as HTMLElement
  const targetParent = clickedTarget.parentNode as HTMLElement
  const targetNextSibling = clickedTarget.nextElementSibling as HTMLElement

  if (targetParent.classList.contains('rating')) {
    removeActive()
    targetParent.classList.add('active')

    selectedRating = targetNextSibling.innerHTML
  }
})

sendBtn?.addEventListener('click', (e) => {
  if (panel != null) {
    panel.innerHTML = `
    <i class="fas fa-heart"></i>
    <strong>Thank You!</strong>
    <strong>Feedback: ${selectedRating}</strong>
    <p>We'll use your feedback to improve our customer support</p>
    `
  }
})

function removeActive() {
  for (let i = 0; i < ratings.length; i++) {
    ratings[i].classList.remove('active')
  }
}
