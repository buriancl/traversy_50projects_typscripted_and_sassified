const counters = document.querySelectorAll<HTMLDivElement>('.counter')

counters.forEach((counter) => {
  counter.innerText = '0'

  const updateCounter = () => {
    const targetString = counter.getAttribute('data-target')
    let target
    if (targetString != null) {
      target = parseInt(targetString)
    }

    const c: number = +counter.innerText

    let increment
    if (target != undefined) {
      increment = target / 200
    }

    if (target != undefined && increment != undefined && c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`
      setTimeout(updateCounter, 1)
    } else {
      if (target != undefined) {
        counter.innerText = target.toString()
      }
    }
  }

  updateCounter()
})
