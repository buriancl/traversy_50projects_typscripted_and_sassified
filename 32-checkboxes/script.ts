const toggles = document.querySelectorAll<HTMLInputElement>('.toggle')
const good = document.querySelector<HTMLInputElement>('#good')
const cheap = document.querySelector<HTMLInputElement>('#cheap')
const fast = document.querySelector<HTMLInputElement>('#fast')

toggles.forEach((toggle) =>
  toggle.addEventListener('change', (e) => {
    if (e.target !== null) {
      doTheTrick(e.target)
    }
  })
)

function doTheTrick(theClickedOne: EventTarget) {
  if (good?.checked && cheap?.checked && fast?.checked) {
    if (good === theClickedOne) {
      fast.checked = false
    }

    if (cheap === theClickedOne) {
      good.checked = false
    }

    if (fast === theClickedOne) {
      cheap.checked = false
    }
  }
}
