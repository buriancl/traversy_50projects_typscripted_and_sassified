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
//Get initial movies
getMovies(API_URL);
function getMovies(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url);
        const data = yield res.json();
        console.log(typeof data, data.results);
        showMovies(data.results);
    });
}
function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
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
    });
}
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
