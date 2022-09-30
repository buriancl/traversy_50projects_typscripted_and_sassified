const backgroundEl = document.getElementById('background') as HTMLDivElement
const passwordInput = document.getElementById('password') as HTMLInputElement

passwordInput?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  let passwordStrength: number = target.value.length
  let blurEffect = 20 - passwordStrength * 2

  backgroundEl != null
    ? (backgroundEl.style.filter = `blur(${blurEffect}px)`)
    : null
})
