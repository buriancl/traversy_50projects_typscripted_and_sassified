const form = document.getElementById('form') as HTMLFormElement
const input = document.getElementById('input') as HTMLInputElement
const todosUL = document.getElementById('todos') as HTMLUListElement

const todos = JSON.parse(localStorage.getItem('todos') || '')

if (todos) {
  todos.forEach((todo: { text: string; completed: boolean }) => addTodo(todo))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  addTodo()
})

function addTodo(todo?: { text: string; completed: boolean }) {
  let todoText = input.value

  if (todo) {
    todoText = todo.text
  }

  if (todoText) {
    const todoEl = document.createElement('li')
    if (todo && todo.completed) {
      todoEl.classList.add('completed')
    }

    todoEl.innerText = todoText

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed')
      updateLS()
    })

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault()

      todoEl.remove()
      updateLS()
    })

    todosUL.appendChild(todoEl)

    input.value = ''

    updateLS()
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li')

  const todos: { text: string; completed: boolean }[] = []

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    })
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}
