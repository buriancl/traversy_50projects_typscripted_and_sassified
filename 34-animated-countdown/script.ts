const nums = document.querySelectorAll<HTMLSpanElement>('.nums span')
const counter = document.querySelector<HTMLDivElement>('.counter')
const finalMessage = document.querySelector<HTMLDivElement>('.final')
const replay = document.querySelector<HTMLButtonElement>('#replay')

runAnimation()

function resetDOM() {
  counter?.classList.remove('hide')
  finalMessage?.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  nums[0].classList.add('in')
}

function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast: number = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter?.classList.add('hide')
        finalMessage?.classList.add('show')
      }
    })
  })
}

replay?.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
