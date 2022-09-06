var marked: any

const addBtn = document.getElementById('add') as HTMLButtonElement

const notes: string[] = JSON.parse(localStorage.getItem('notes') || '')

if (notes) {
  notes.forEach((note) => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  note.innerHTML = `
    <div class="tools">
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
  `

  const editBtn = note.querySelector<HTMLButtonElement>('.edit')
  const deleteBtn = note.querySelector<HTMLButtonElement>('.delete')
  const main = note.querySelector<HTMLDivElement>('.main')
  const textArea = note.querySelector<HTMLTextAreaElement>('textarea')

  if (textArea !== null) {
    textArea.value = text
  }

  if (main !== null) {
    main.innerHTML = marked(text)
  }

  deleteBtn?.addEventListener('click', () => {
    note.remove()

    updateLS()
  })

  editBtn?.addEventListener('click', () => {
    main?.classList.toggle('hidden')
    textArea?.classList.toggle('hidden')
  })

  textArea?.addEventListener('input', (e) => {
    const value = (e.target as HTMLInputElement).value

    if (main !== null) {
      main.innerHTML = marked(value)
    }

    updateLS()
  })

  document.body.appendChild(note)
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  const notes: string[] = []

  notesText.forEach((note) => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes))
}
