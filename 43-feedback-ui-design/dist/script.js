"use strict";
const ratings = document.querySelectorAll('.rating');
const ratingsContainer = document.querySelector('.ratings-container');
const sendBtn = document.querySelector('#send');
const panel = document.querySelector('#panel');
let selectedRating = 'Satisfied';
ratingsContainer === null || ratingsContainer === void 0 ? void 0 : ratingsContainer.addEventListener('click', (e) => {
    const clickedTarget = e.target;
    const targetParent = clickedTarget.parentNode;
    const targetNextSibling = clickedTarget.nextElementSibling;
    if (targetParent.classList.contains('rating')) {
        removeActive();
        targetParent.classList.add('active');
        selectedRating = targetNextSibling.innerHTML;
    }
});
sendBtn === null || sendBtn === void 0 ? void 0 : sendBtn.addEventListener('click', (e) => {
    if (panel != null) {
        panel.innerHTML = `
    <i class="fas fa-heart"></i>
    <strong>Thank You!</strong>
    <strong>Feedback: ${selectedRating}</strong>
    <p>We'll use your feedback to improve our customer support</p>
    `;
    }
});
function removeActive() {
    for (let i = 0; i < ratings.length; i++) {
        ratings[i].classList.remove('active');
    }
}
