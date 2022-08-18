const textEl = document.getElementById('text') as HTMLHeadingElement
const speedEl = document.getElementById('speed') as HTMLInputElement

const text = 'We love programming'
let idx: number = 1
let speedValue
if (speedEl != null) {
  speedValue = parseInt(speedEl.value)
}
let speed: number
if (speedValue != undefined) {
  speed = 300 / speedValue
}

writeText()

function writeText() {
  textEl.innerText = text.slice(0, idx)

  idx++

  if (idx > text.length) {
    idx = 1
  }

  setTimeout(writeText, speed)
}

speedEl.addEventListener('input', (e) => {
  let speedInput = e.target as HTMLInputElement

  speed = 300 / parseInt(speedInput.value)
})
