const loadText = document.querySelector<HTMLDivElement>('.loading-text')
const bg = document.querySelector<HTMLTableSectionElement>('.bg')

let load: number = 0

let int: number = setInterval(blurring, 30)

function blurring() {
  load++

  if (load > 99) {
    clearInterval(int)
  }

  if (loadText != null) {
    loadText.innerText = `${load}%`
    loadText.style.opacity = scale(load, 0, 100, 1, 0).toString()
  }

  if (bg != null) {
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
  }
}

const scale = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
