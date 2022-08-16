"use strict";
const toggleArr = document.querySelectorAll('.faq-toggle');
toggleArr.forEach((toggleEl) => {
    toggleEl.addEventListener('click', () => {
        let parentEl = toggleEl.parentNode;
        parentEl.classList.toggle('active');
    });
});
