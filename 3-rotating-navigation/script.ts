const openButton = document.getElementById('open') as HTMLButtonElement
const closeButton = document.getElementById('close') as HTMLButtonElement
const container = document.querySelector<HTMLDivElement>('.container')

openButton.addEventListener('click', () => container?.classList.add('show-nav'))

closeButton.addEventListener('click', () => {
  container?.classList.remove('show-nav')
})
