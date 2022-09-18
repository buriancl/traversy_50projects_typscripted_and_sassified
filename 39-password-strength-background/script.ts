const backgroundEl = document.getElementById('background')
const passwordInput = document.getElementById('password')

passwordInput?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  let passwordStrength: number = target.value.length
  let blurEffect = 20 - passwordStrength * 2

  backgroundEl != null
    ? (backgroundEl.style.filter = `blur(${blurEffect}px)`)
    : null
})
