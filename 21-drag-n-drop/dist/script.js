"use strict";
const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
fill === null || fill === void 0 ? void 0 : fill.addEventListener('dragstart', dragStart);
fill === null || fill === void 0 ? void 0 : fill.addEventListener('dragend', dragEnd);
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}
function dragStart() {
    if (fill != null) {
        fill.className += ' hold';
        setTimeout(() => (fill.className = 'invisible'), 0);
    }
}
function dragEnd() {
    if (fill != null) {
        fill.className = 'fill';
    }
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
    if (e.target != null && e.target instanceof Element) {
        e.target.className += ' hovered';
    }
}
function dragLeave(e) {
    if (e.target != null && e.target instanceof Element) {
        e.target.className = 'empty';
    }
}
function dragDrop(e) {
    if (e.target != null &&
        e.target instanceof Element &&
        fill instanceof Element) {
        e.target.className = 'empty';
        e.target.append(fill);
    }
}
