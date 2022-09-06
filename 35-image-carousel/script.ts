const imgs = document.getElementById('imgs') as HTMLDivElement
const leftBtn = document.getElementById('left') as HTMLButtonElement
const rightBtn = document.getElementById('right') as HTMLButtonElement

const img = document.querySelectorAll('#imgs img')

let idx: number = 0

let interval: number = setInterval(run, 2000)

function run() {
  idx++

  changeImage()
}

function changeImage() {
  if (idx > img.length - 1) {
    idx = 0
  } else if (idx < 0) {
    idx = img.length - 1
  }

  imgs.style.transform = `translateX(${-idx * 500}px)`
}

function resetInterval() {
  clearInterval(interval)
  interval = setInterval(run, 2000)
}

rightBtn.addEventListener('click', () => {
  idx++

  changeImage()
  resetInterval()
})

leftBtn.addEventListener('click', () => {
  idx--

  changeImage()
  resetInterval()
})
