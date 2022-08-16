"use strict";
const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
    search === null || search === void 0 ? void 0 : search.classList.toggle('active');
    input === null || input === void 0 ? void 0 : input.focus();
});
