const search = document.querySelector<HTMLDivElement>('.search')
const btn = document.querySelector<HTMLButtonElement>('.btn')
const input = document.querySelector<HTMLInputElement>('.input')

btn?.addEventListener('click', () => {
  search?.classList.toggle('active')
  input?.focus()
})
