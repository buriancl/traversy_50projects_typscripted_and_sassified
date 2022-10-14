"use strict";
const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
const containerEl = document.querySelector('.container');
let currentActive = 1;
next === null || next === void 0 ? void 0 : next.addEventListener('click', () => {
    currentActive++;
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    update();
});
prev === null || prev === void 0 ? void 0 : prev.addEventListener('click', () => {
    currentActive--;
    if (currentActive < 1) {
        currentActive = 1;
    }
    update();
});
const update = () => {
    circles.forEach((circle, i) => {
        if (i < currentActive) {
            circle.classList.add('active');
        }
        else {
            circle.classList.remove('active');
        }
    });
    const actives = document.querySelectorAll('.active');
    progress.style.width =
        ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
    if (currentActive === 1) {
        prev.disabled = true;
        removeMessage();
    }
    else if (currentActive === circles.length) {
        next.disabled = true;
        displayMessage();
    }
    else {
        prev.disabled = false;
        next.disabled = false;
        removeMessage();
    }
};
function displayMessage() {
    const messageEl = document.createElement('p');
    messageEl.classList.add('complete-message');
    messageEl.innerText = 'Complete!';
    containerEl === null || containerEl === void 0 ? void 0 : containerEl.prepend(messageEl);
}
function removeMessage() {
    const messageEl = document.querySelector('.complete-message');
    messageEl === null || messageEl === void 0 ? void 0 : messageEl.remove();
}
