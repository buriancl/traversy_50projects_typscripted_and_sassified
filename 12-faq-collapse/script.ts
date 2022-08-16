const toggleArr = document.querySelectorAll<HTMLButtonElement>('.faq-toggle')

toggleArr.forEach((toggleEl) => {
  toggleEl.addEventListener('click', () => {
    let parentEl = toggleEl.parentNode as HTMLDivElement
    parentEl.classList.toggle('active')
  })
})
