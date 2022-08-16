const tagsEl = document.getElementById('tags') as HTMLDivElement
const textarea = document.getElementById('textarea') as HTMLTextAreaElement

textarea.focus()

textarea.addEventListener('keyup', (e) => {
  const target = e.target as HTMLTextAreaElement

  createTags(target.value)

  if (e.key === 'Enter') {
    setTimeout(() => {
      target.value = ''
    }, 10)
    randomSelect()
  }
})

function createTags(input: string) {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim())

  tagsEl.innerHTML = ''

  tags.forEach((tag) => {
    const tagEl = document.createElement('span')
    tagEl.classList.add('tag')
    tagEl.innerText = tag
    tagsEl.appendChild(tagEl)
  })
}

function randomSelect() {
  const times: number = 30

  const interval = setInterval(() => {
    const randomTag = pickRandomTag() as HTMLSpanElement

    highlightTag(randomTag)

    setTimeout(() => {
      unHighlightTag(randomTag)
    }, 100)
  }, 100)

  setTimeout(() => {
    clearInterval(interval)

    setTimeout(() => {
      const randomTag = pickRandomTag()

      highlightTag(randomTag)
    })
  }, times * 100)
}

function pickRandomTag() {
  const tags = document.querySelectorAll<HTMLSpanElement>('.tag')
  return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag: HTMLSpanElement) {
  tag.classList.add('highlight')
}

function unHighlightTag(tag: HTMLSpanElement) {
  tag.classList.remove('highlight')
}
