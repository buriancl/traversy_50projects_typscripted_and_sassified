"use strict";
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.container');
left === null || left === void 0 ? void 0 : left.addEventListener('mouseenter', () => container === null || container === void 0 ? void 0 : container.classList.add('hover-left'));
left === null || left === void 0 ? void 0 : left.addEventListener('mouseleave', () => container === null || container === void 0 ? void 0 : container.classList.remove('hover-left'));
right === null || right === void 0 ? void 0 : right.addEventListener('mouseenter', () => container === null || container === void 0 ? void 0 : container.classList.add('hover-right'));
right === null || right === void 0 ? void 0 : right.addEventListener('mouseleave', () => container === null || container === void 0 ? void 0 : container.classList.remove('hover-right'));
