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
const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];
getData();
filter === null || filter === void 0 ? void 0 : filter.addEventListener('input', (e) => {
    const target = e.target;
    filterData(target.value);
});
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('https://randomuser.me/api?results=50');
        const { results } = yield res.json();
        //Clear results
        result.innerHTML = '';
        results.forEach((user) => {
            const li = document.createElement('li');
            listItems.push(li);
            li.innerHTML = `
    <img src="${user.picture.large}" alt="${user.name.first}">
    <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
    </div>
    `;
            result.appendChild(li);
        });
    });
}
function filterData(searchTerm) {
    listItems.forEach((item) => {
        if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide');
        }
        else {
            item.classList.add('hide');
        }
    });
}
