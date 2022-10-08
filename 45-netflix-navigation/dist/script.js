"use strict";
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const nav = document.querySelectorAll('.nav');
openBtn === null || openBtn === void 0 ? void 0 : openBtn.addEventListener('click', () => {
    nav.forEach((navEl) => {
        navEl.classList.add('visible');
    });
});
closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', () => {
    nav.forEach((navEl) => {
        navEl.classList.remove('visible');
    });
});
