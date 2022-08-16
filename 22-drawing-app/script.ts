const canvas = document.getElementById('canvas') as HTMLCanvasElement
const increaseBtn = document.getElementById('increase') as HTMLButtonElement
const decreaseBtn = document.getElementById('decrease') as HTMLButtonElement
const sizeEl = document.getElementById('size') as HTMLSpanElement
const colorEl = document.getElementById('color') as HTMLInputElement
const clearEl = document.getElementById('clear') as HTMLButtonElement

const ctx = canvas.getContext('2d')

let size = 10
let isPressed = false
let color = 'black'
let x: any
let y: any

canvas.addEventListener('mousedown', (e) => {
  isPressed = true
  x = e.offsetX
  y = e.offsetY
})

canvas.addEventListener('mouseup', (e) => {
  isPressed = false
  x = undefined
  y = undefined
})

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY

    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)

    x = x2
    y = y2
  }
})

function drawCircle(x: number, y: number) {
  if (ctx != null) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }
}

function drawLine(x1: number, y1: number, x2: number, y2: number) {
  if (ctx != null) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
  }
}

function updateSizeOnScreen() {
  sizeEl.innerText = size.toString()
}

increaseBtn.addEventListener('click', () => {
  size += 5
  if (size > 50) {
    size = 50
  }

  updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
  size -= 5
  if (size < 5) {
    size = 5
  }

  updateSizeOnScreen()
})

colorEl.addEventListener('change', (e) => {
  if (e.target != null) {
    color = (e.target as HTMLInputElement).value
  }
})

clearEl.addEventListener('click', () =>
  ctx?.clearRect(0, 0, canvas.width, canvas.height)
)
