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
const APIURL = 'https://api.github.com/users/';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        yield fetch(APIURL + username)
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            if (response.status == 404) {
                createErrorCard('No profile with this username');
            }
            throw new Error();
        })
            .then((parsedResponse) => {
            createUserCard(parsedResponse);
            getRepos(username);
        })
            .catch((error) => console.log(error));
    });
}
function getRepos(username) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(APIURL + username + '/repos?sort=created')
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
            .then((parsedResponse) => addReposToCard(parsedResponse))
            .catch(() => createErrorCard('Problem fetching repos'));
    });
}
function createErrorCard(msg) {
    const cardHTML = `
    <div class = 'card'>
    <h1>${msg}</h1>
    </div>
    `;
    main.innerHTML = cardHTML;
}
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    repos.slice(0, 5).forEach((repo) => {
        const { html_url, name } = repo;
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = html_url;
        repoEl.target = '_blank';
        repoEl.innerText = name;
        reposEl.appendChild(repoEl);
    });
}
function createUserCard(user) {
    const { name, avatar_url, bio, followers, following, public_repos } = user;
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
    `;
    main.innerHTML = cardHTML;
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = '';
    }
});
