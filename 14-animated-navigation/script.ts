const toggle = document.getElementById('toggle') as HTMLButtonElement
const nav = document.getElementById('nav') as HTMLElement

toggle.addEventListener('click', () => nav.classList.toggle('active'))
