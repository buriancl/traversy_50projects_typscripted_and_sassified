const nav = document.querySelector<HTMLElement>('.nav')

window.addEventListener('scroll', fixNav)

function fixNav() {
  if (nav != null) {
    if (window.scrollY > nav.offsetHeight + 150) {
      nav.classList.add('active')
    } else {
      nav.classList.remove('active')
    }
  }
}
