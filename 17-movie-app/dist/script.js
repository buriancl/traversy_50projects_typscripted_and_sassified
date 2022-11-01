"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b0a402eca41caa9931010586ca76e936&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=b0a402eca41caa9931010586ca76e936&query="';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const modalEl = document.getElementById('modal');
const movieDataContainerEl = document.getElementById('movieDataContainer');
const closeModalBtn = document.querySelector('.closeModalBtn');
const modalTitleEl = document.querySelector('.modalTitle');
const taglineEl = document.querySelector('.tagline');
const genreListEl = document.querySelector('.genreList');
const moviePosterEL = document.querySelector('.modalPoster');
const overViewEl = document.querySelector('.modalOverview');
const runtimeEl = document.querySelector('.runtime');
const mpaaRatingEl = document.querySelector('.mpaaRating');
const creditsDropdownEl = document.querySelector('.creditsDropdown');
const directorEl = document.querySelector('.directorName');
const castListEl = document.querySelector('.castList');
const creditsToggleEl = document.querySelector('.creditsToggle');
//Get initial movies
getMovies(API_URL);
function getMovies(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url);
        const data = yield res.json();
        showMovies(data.results);
    });
}
function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
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
    `;
        main.appendChild(movieEl);
        movieEl.addEventListener('click', () => {
            getMovieData(id);
            modalEl.showModal();
        });
    });
}
//Get movie data
function getMovieData(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=b0a402eca41caa9931010586ca76e936&language=en-US&append_to_response=release_dates,credits`);
        const data = yield res.json();
        createModal(data);
    });
}
function createModal(movieData) {
    console.log(movieData);
    if (genreListEl) {
        genreListEl.innerHTML = '';
    }
    if (castListEl) {
        castListEl.innerHTML = '';
    }
    if (creditsDropdownEl) {
        creditsDropdownEl.classList.remove('active');
    }
    movieData.genres.forEach((genre) => {
        const genreEl = document.createElement('li');
        genreEl.innerText = `${genre.name}`;
        genreListEl === null || genreListEl === void 0 ? void 0 : genreListEl.appendChild(genreEl);
    });
    if (modalTitleEl && taglineEl && moviePosterEL && overViewEl && runtimeEl) {
        modalTitleEl.innerText = `${movieData.title}`;
        taglineEl.innerText = `${movieData.tagline}`;
        moviePosterEL.src = `${IMG_PATH + movieData.poster_path}`;
        moviePosterEL.alt = `${movieData.title}`;
        overViewEl.innerText = `${movieData.overview}`;
        runtimeEl.innerText = `${movieData.runtime}min`;
    }
    const releaseDates = movieData.release_dates.results;
    const usReleases = releaseDates.filter((releaseObj) => {
        return releaseObj.iso_3166_1 === 'US';
    });
    const usCert = usReleases[0];
    if (mpaaRatingEl) {
        if (usCert.release_dates[0].certification !== '') {
            mpaaRatingEl.innerText = usCert.release_dates[0].certification;
        }
        else if (usCert.release_dates.length > 1 &&
            usCert.release_dates[1].certification !== '') {
            mpaaRatingEl.innerText = usCert.release_dates[1].certification;
        }
        else {
            mpaaRatingEl.innerText = 'NR';
        }
    }
    if (directorEl) {
        directorEl.innerText = `${getDirector(movieData.credits.crew)}`;
    }
    if (castListEl) {
        const castList = getCast(movieData.credits.cast);
        castList.forEach((castMember) => {
            let verifiedProfileImgPath = '';
            if (castMember.profileImg != null) {
                verifiedProfileImgPath = IMG_PATH + castMember.profileImg;
            }
            else {
                verifiedProfileImgPath =
                    'https://www.kindpng.com/picc/m/144-1447559_profile-icon-missing-profile-picture-icon-hd-png.png';
            }
            const actorEl = document.createElement('div');
            actorEl.classList.add('actorInfo');
            actorEl.innerHTML = `
      <img class="profilePic" src='${verifiedProfileImgPath}' alt='${castMember.name}' />
      <div class="namesContainer">
      <p>${castMember.name}</p>
      <p>${castMember.character}</p>
      </div>
      `;
            castListEl.append(actorEl);
        });
    }
}
function getDirector(crew) {
    const director = crew.filter((crewMember) => {
        return crewMember.job === 'Director';
    });
    return director[0].name;
}
function getCast(cast) {
    const castList = [];
    console.log(cast);
    if (cast.length >= 10) {
        for (let i = 0; i < 10; i++) {
            castList.push({
                name: cast[i].name,
                character: cast[i].character,
                profileImg: cast[i].profile_path,
            });
        }
    }
    else {
        for (let i = 0; i < cast.length; i++) {
            castList.push({
                name: cast[i].name,
                character: cast[i].character,
                profileImg: cast[i].profile_path,
            });
        }
    }
    console.log(castList);
    return castList;
}
creditsToggleEl === null || creditsToggleEl === void 0 ? void 0 : creditsToggleEl.addEventListener('click', () => {
    let creditsSwitch = creditsToggleEl.parentNode;
    creditsSwitch.classList.toggle('active');
});
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    }
    else if (vote >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    }
    else {
        window.location.reload();
    }
});
closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.addEventListener('click', () => {
    modalEl.close();
});
