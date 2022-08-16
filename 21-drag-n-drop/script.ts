const fill = document.querySelector<HTMLDivElement>('.fill')
const empties = document.querySelectorAll<HTMLDivElement>('.empty')

fill?.addEventListener('dragstart', dragStart)
fill?.addEventListener('dragend', dragEnd)

for (const empty of empties) {
  empty.addEventListener('dragover', dragOver)
  empty.addEventListener('dragenter', dragEnter)
  empty.addEventListener('dragleave', dragLeave)
  empty.addEventListener('drop', dragDrop)
}

function dragStart() {
  if (fill != null) {
    fill.className += ' hold'
    setTimeout(() => (fill.className = 'invisible'), 0)
  }
}

function dragEnd() {
  if (fill != null) {
    fill.className = 'fill'
  }
}

function dragOver(e: MouseEvent) {
  e.preventDefault()
}

function dragEnter(e: MouseEvent) {
  e.preventDefault()
  if (e.target != null && e.target instanceof Element) {
    e.target.className += ' hovered'
  }
}

function dragLeave(e: MouseEvent) {
  if (e.target != null && e.target instanceof Element) {
    e.target.className = 'empty'
  }
}

function dragDrop(e: MouseEvent) {
  if (
    e.target != null &&
    e.target instanceof Element &&
    fill instanceof Element
  ) {
    e.target.className = 'empty'
    e.target.append(fill)
  }
}
