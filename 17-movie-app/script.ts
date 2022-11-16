const API_URL: string =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b0a402eca41caa9931010586ca76e936&page=1'

const IMG_PATH: string = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API: string =
  'https://api.themoviedb.org/3/search/movie?api_key=b0a402eca41caa9931010586ca76e936&query="'

const main = document.getElementById('main') as HTMLElement
const form = document.getElementById('form') as HTMLFormElement
const search = document.getElementById('search') as HTMLInputElement
const modalEl = document.getElementById('modal') as HTMLDialogElement
const movieDataContainerEl = document.getElementById(
  'movieDataContainer'
) as HTMLDivElement
const closeModalBtn =
  document.querySelector<HTMLButtonElement>('.closeModalBtn')
const modalTitleEl = document.querySelector<HTMLTitleElement>('.modalTitle')
const taglineEl = document.querySelector<HTMLTitleElement>('.tagline')
const genreListEl = document.querySelector<HTMLDivElement>('.genreList')
const moviePosterEL = document.querySelector<HTMLImageElement>('.modalPoster')
const overViewEl =
  document.querySelector<HTMLParagraphElement>('.modalOverview')
const runtimeEl = document.querySelector<HTMLParagraphElement>('.runtime')
const mpaaRatingEl = document.querySelector<HTMLParagraphElement>('.mpaaRating')
const creditsDropdownEl =
  document.querySelector<HTMLDivElement>('.creditsDropdown')
const directorEl = document.querySelector<HTMLParagraphElement>('.directorName')
const castListEl = document.querySelector<HTMLDivElement>('.castList')
const creditsToggleEl =
  document.querySelector<HTMLButtonElement>('.creditsToggle')
const releaseDateEl = document.querySelector<HTMLParagraphElement>('.date')

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
    const { title, poster_path, vote_average, overview, id } = movie

    let verifiedPosterImg = ''
    if (poster_path != null && poster_path != '') {
      verifiedPosterImg = IMG_PATH + poster_path
    } else {
      verifiedPosterImg =
        'https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg'
    }

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
    <img src="${verifiedPosterImg}" alt="${title}">
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

    movieEl.addEventListener('click', () => {
      getMovieData(id)
      modalEl.showModal()
    })
  })
}

//Get movie data
async function getMovieData(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=b0a402eca41caa9931010586ca76e936&language=en-US&append_to_response=release_dates,credits,recommendations,reviews`
  )
  const data = await res.json()

  createModal(data)
}

function createModal(movieData: any) {
  console.log(movieData.release_date)

  clearElements()

  if (creditsDropdownEl) {
    creditsDropdownEl.classList.remove('active')
  }

  let verifiedPosterImg = ''

  if (movieData.poster_path != null && movieData.poster_path != '') {
    verifiedPosterImg = IMG_PATH + movieData.poster_path
  } else {
    verifiedPosterImg =
      'https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg'
  }

  movieData.genres.forEach((genre: { name: string }) => {
    const genreEl = document.createElement('li')
    genreEl.innerText = `${genre.name}`

    genreListEl?.appendChild(genreEl)
  })

  if (modalTitleEl && taglineEl && moviePosterEL && overViewEl && runtimeEl) {
    modalTitleEl.innerText = `${movieData.title}`
    taglineEl.innerText = `${movieData.tagline}`
    moviePosterEL.src = `${verifiedPosterImg}`
    moviePosterEL.alt = `${movieData.title}`
    overViewEl.innerText = `${movieData.overview}`
    runtimeEl.innerText = `${movieData.runtime}min`
  }

  if (releaseDateEl) {
    releaseDateEl.innerText = `${getReleaseDate()}`
  }

  function getReleaseDate() {
    const monthsArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const splitDateArr = movieData.release_date.split('-')
    console.log(splitDateArr)
    const releaseYear = splitDateArr[0]
    const releaseMonth = monthsArr[parseInt(splitDateArr[1])]
    const releaseDay = splitDateArr[2]
    console.log(
      'releaseYear ===> ',
      releaseYear,
      'releaseMonth ===> ',
      releaseMonth,
      'releaseDay ===> ',
      releaseDay
    )

    return `${releaseMonth} ${releaseDay}, ${releaseYear}`
  }

  const releaseDates = movieData.release_dates.results

  const usReleases = releaseDates.filter(
    (releaseObj: { iso_3166_1: string }) => {
      return releaseObj.iso_3166_1 === 'US'
    }
  )

  let usCert = []
  if (usReleases.length != 0) {
    usCert = usReleases[0]
  } else {
    usCert.push('NR')
  }

  if (mpaaRatingEl) {
    if (usCert[0] === 'NR') {
      mpaaRatingEl.innerText = 'NR'
    } else if (usCert.release_dates[0].certification !== '') {
      mpaaRatingEl.innerText = usCert.release_dates[0].certification
    } else if (
      usCert.release_dates.length > 1 &&
      usCert.release_dates[1].certification !== ''
    ) {
      mpaaRatingEl.innerText = usCert.release_dates[1].certification
    } else {
      mpaaRatingEl.innerText = 'NR'
    }
  }

  if (directorEl) {
    directorEl.innerText = `${getDirector(movieData.credits.crew)}`
  }

  if (castListEl) {
    const castList = getCast(movieData.credits.cast)

    if (castList.length === 0) {
      const noActorsEl = document.createElement('p')
      noActorsEl.innerText = 'No cast information found'
      castListEl.append(noActorsEl)
    } else {
      castList.forEach((castMember) => {
        let verifiedProfileImgPath = ''
        if (castMember.profileImg != null) {
          verifiedProfileImgPath = IMG_PATH + castMember.profileImg
        } else {
          verifiedProfileImgPath =
            'https://www.kindpng.com/picc/m/144-1447559_profile-icon-missing-profile-picture-icon-hd-png.png'
        }
        const actorEl = document.createElement('div')
        actorEl.classList.add('actorInfo')
        actorEl.innerHTML = `
      <img class="profilePic" src='${verifiedProfileImgPath}' alt='${castMember.name}' />
      <div class="namesContainer">
      <p>${castMember.name}</p>
      <p>${castMember.character}</p>
      </div>
      `
        castListEl.append(actorEl)
      })
    }
  }
}

function clearElements() {
  if (genreListEl && directorEl && castListEl) {
    genreListEl.innerHTML = ''
    directorEl.innerText = ''
    castListEl.innerHTML = ''
  }
}

function getDirector(crew: { job: string; name: string }[]) {
  const director = crew.filter((crewMember) => {
    return crewMember.job === 'Director'
  })

  if (director.length === 0) {
    return 'Director information not found.'
  } else {
    return director[0].name
  }
}

function getCast(
  cast: { name: string; character: string; profile_path: string }[]
) {
  const castList = []

  if (cast.length >= 10) {
    for (let i = 0; i < 10; i++) {
      castList.push({
        name: cast[i].name,
        character: cast[i].character,
        profileImg: cast[i].profile_path,
      })
    }
  } else {
    for (let i = 0; i < cast.length; i++) {
      castList.push({
        name: cast[i].name,
        character: cast[i].character,
        profileImg: cast[i].profile_path,
      })
    }
  }

  return castList
}

creditsToggleEl?.addEventListener('click', () => {
  let creditsSwitch = creditsToggleEl.parentNode as HTMLDivElement
  creditsSwitch.classList.toggle('active')
})

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

closeModalBtn?.addEventListener('click', () => {
  modalEl.close()
})
