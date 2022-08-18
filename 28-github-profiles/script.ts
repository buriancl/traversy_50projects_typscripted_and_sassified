const APIURL: string = 'https://api.github.com/users/'

const form = document.getElementById('form') as HTMLFormElement
const search = document.getElementById('search') as HTMLInputElement
const main = document.getElementById('main') as HTMLElement

async function getUser(username: string) {
  let data

  await fetch(APIURL + username)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      if (response.status == 404) {
        createErrorCard('No profile with this username')
      }
      throw new Error()
    })
    .then((parsedResponse) => {
      createUserCard(parsedResponse)
      getRepos(username)
    })
    .catch((error) => console.log(error))
}

async function getRepos(username: string) {
  await fetch(APIURL + username + '/repos?sort=created')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    .then((parsedResponse) => addReposToCard(parsedResponse))
    .catch(() => createErrorCard('Problem fetching repos'))
}

function createErrorCard(msg: string) {
  const cardHTML = `
    <div class = 'card'>
    <h1>${msg}</h1>
    </div>
    `

  main.innerHTML = cardHTML
}

function addReposToCard(repos: object[]) {
  const reposEl = document.getElementById('repos') as HTMLDivElement

  repos.slice(0, 5).forEach((repo: any) => {
    const { html_url, name } = repo
    const repoEl = document.createElement('a')
    repoEl.classList.add('repo')
    repoEl.href = html_url
    repoEl.target = '_blank'
    repoEl.innerText = name

    reposEl.appendChild(repoEl)
  })
}

function createUserCard(user: any) {
  const { name, avatar_url, bio, followers, following, public_repos } = user
  const cardHTML = `
    <div class="card">
        <div>
          <img
            src="${avatar_url}"
            alt="${name}"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${name}</h2>
          <p>
            ${bio}
          </p>

          <ul>
            <li>${followers} <strong>Followers</strong></li>
            <li>${following} <strong>Following</strong></li>
            <li>${public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos">
            
          </div>
        </div>
      </div>
    `

  main.innerHTML = cardHTML
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const user: string = search.value

  if (user) {
    getUser(user)

    search.value = ''
  }
})
