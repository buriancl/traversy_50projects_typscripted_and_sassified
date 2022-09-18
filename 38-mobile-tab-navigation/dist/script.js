"use strict";
const contentEl = document.querySelectorAll('.content');
const buttonsEl = document.querySelectorAll('li');
buttonsEl.forEach((button, index) => {
    button.addEventListener('click', () => {
        hideAllContents();
        removeButtonStyles();
        button.classList.add('active');
        contentEl[index].classList.add('show');
    });
});
function hideAllContents() {
    contentEl.forEach((content) => {
        content.classList.remove('show');
    });
}
function removeButtonStyles() {
    buttonsEl.forEach((button) => {
        button.classList.remove('active');
    });
}
