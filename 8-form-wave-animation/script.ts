const labels = document.querySelectorAll<HTMLLabelElement>(
  '.form-control label'
)

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split('')
    .map(
      (letter, i) =>
        `<span style="transition-delay:${i * 30}ms">${letter}</span>`
    )
    .join('')
})
