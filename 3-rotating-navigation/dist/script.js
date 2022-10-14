"use strict";
const openButton = document.getElementById('open');
const closeButton = document.getElementById('close');
const container = document.querySelector('.container');
openButton.addEventListener('click', () => container === null || container === void 0 ? void 0 : container.classList.add('show-nav'));
closeButton.addEventListener('click', () => {
    container === null || container === void 0 ? void 0 : container.classList.remove('show-nav');
});
