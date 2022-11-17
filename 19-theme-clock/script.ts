const htmlEl = document.querySelector<HTMLElement>('html')
const hourEl = document.querySelector<HTMLDivElement>('.hour')
const minuteEl = document.querySelector<HTMLDivElement>('.minute')
const secondEl = document.querySelector<HTMLDivElement>('.second')
const timeEl = document.querySelector<HTMLDivElement>('.time')
const dateEl = document.querySelector<HTMLDivElement>('.date')
const toggle = document.querySelector<HTMLButtonElement>('.toggle')

const days: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const months: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

toggle?.addEventListener('click', (e) => {
  if (
    htmlEl?.classList.contains('dark') &&
    e.target != undefined &&
    e.target instanceof Element
  ) {
    htmlEl.classList.remove('dark')
    e.target.innerHTML = 'Dark mode'
  } else if (e.target != undefined && e.target instanceof Element) {
    htmlEl?.classList.add('dark')
    e.target.innerHTML = 'Light mode'
  }
})

function setTime() {
  const time = new Date()
  const month = time.getMonth()
  const day = time.getDay()
  const date = time.getDate()
  const hours = time.getHours()
  const hoursForClock = hours % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  if (hourEl != null) {
    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
      hoursForClock,
      0,
      11,
      0,
      360
    )}deg)`
  }

  if (minuteEl != null) {
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
      minutes,
      0,
      59,
      0,
      360
    )}deg)`
  }

  if (secondEl != null) {
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(
      seconds,
      0,
      59,
      0,
      360
    )}deg)`
  }

  if (timeEl != null) {
    timeEl.innerHTML = `${hoursForClock}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${ampm}`
  }

  if (dateEl != null) {
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class='circle'>${date}</span>`
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

setTime()

setInterval(setTime, 1000)
