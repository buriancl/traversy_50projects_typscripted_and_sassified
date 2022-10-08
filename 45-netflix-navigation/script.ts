const openBtn = document.querySelector<HTMLButtonElement>('.open-btn')
const closeBtn = document.querySelector<HTMLButtonElement>('.close-btn')
const nav = document.querySelectorAll<HTMLDivElement>('.nav')

openBtn?.addEventListener('click', () => {
  nav.forEach((navEl) => {
    navEl.classList.add('visible')
  })
})

closeBtn?.addEventListener('click', () => {
  nav.forEach((navEl) => {
    navEl.classList.remove('visible')
  })
})
