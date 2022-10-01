const result = document.getElementById('result') as HTMLUListElement
const filter = document.getElementById('filter') as HTMLInputElement
const listItems: HTMLElement[] = []

getData()

filter?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  filterData(target.value)
})

async function getData() {
  const res = await fetch('https://randomuser.me/api?results=50')

  const { results } = await res.json()

  //Clear results
  result.innerHTML = ''

  results.forEach(
    (user: {
      picture: { large: string }
      name: { first: string; last: string }
      location: { city: string; country: string }
    }) => {
      const li = document.createElement('li')

      listItems.push(li)

      li.innerHTML = `
    <img src="${user.picture.large}" alt="${user.name.first}">
    <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
    </div>
    `

      result.appendChild(li)
    }
  )
}

function filterData(searchTerm: string) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove('hide')
    } else {
      item.classList.add('hide')
    }
  })
}
