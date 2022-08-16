const boxes = document.querySelectorAll<HTMLDivElement>('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
  const triggerBottom: number = (window.innerHeight / 5) * 4

  boxes.forEach((box) => {
    const boxTop: number = box.getBoundingClientRect().top

    if (boxTop < triggerBottom) {
      box.classList.add('show')
    } else {
      box.classList.remove('show')
    }
  })
}
