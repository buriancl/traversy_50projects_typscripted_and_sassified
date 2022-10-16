"use strict";
const questions = [
    {
        question: "Why shouldn't we trust atoms?",
        answer: 'They make up everything.',
    },
    {
        question: 'What do you call someone with no body and no nose?',
        answer: 'Nobody knows.',
    },
    {
        question: " What's the object-oriented way to become wealthy?",
        answer: 'Inheritance',
    },
    {
        question: 'How many tickles does it take to tickle an octopus',
        answer: 'Tenticles',
    },
    {
        question: 'What is: 1 + 1?',
        answer: 'Depends on who are you asking.',
    },
];
const faqContainer = document.querySelector('.faq-container');
questions.forEach((question) => {
    const faqEl = document.createElement('div');
    faqEl.classList.add('faq');
    faqEl.innerHTML = `  
  <h3 class="faq-title">${question.question}</h3>
  <p class="faq-text">${question.answer}</p>
  <button class="faq-toggle">
    <i class="fas fa-chevron-down"></i>
    <i class="fas fa-times"></i>
  </button>`;
    faqContainer === null || faqContainer === void 0 ? void 0 : faqContainer.append(faqEl);
});
const toggleArr = document.querySelectorAll('.faq-toggle');
toggleArr.forEach((toggleEl) => {
    toggleEl.addEventListener('click', () => {
        let parentEl = toggleEl.parentNode;
        parentEl.classList.toggle('active');
    });
});
