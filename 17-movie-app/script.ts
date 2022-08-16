const API_URL: string =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b0a402eca41caa9931010586ca76e936&page=1'

const IMG_PATH: string = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API: string =
  'https://api.themoviedb.org/3/search/movie?api_key=b0a402eca41caa9931010586ca76e936&query="'

const main = document.getElementById('main') as HTMLElement
const form = document.getElementById('form') as HTMLFormElement
const search = document.getElementById('search') as HTMLInputElement

//Get initial movies
getMovies(API_URL)

async function getMovies(url: string) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}

function showMovies(movies: any) {
  main.innerHTML = ''

  movies.forEach((movie: any) => {
    const { title, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class='movie-info'>
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
    <h3>Overview</h3>
    ${overview}
    </div>
    </div>
    `

    main.appendChild(movieEl)
  })
}

function getClassByRate(vote: number) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
  } else {
    window.location.reload()
  }
})
