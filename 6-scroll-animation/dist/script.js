"use strict";
const boxAmount = 22;
for (let i = 0; i < boxAmount; i++) {
    generateBox();
}
function generateBox() {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `<h2>Content</h2>`;
    document.body.append(box);
}
const boxes = document.querySelectorAll('.box');
window.addEventListener('scroll', checkBoxes);
checkBoxes();
function checkBoxes() {
    const triggerBottom = (window.innerHeight / 5) * 4;
    boxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            box.classList.add('show');
        }
        else {
            box.classList.remove('show');
        }
    });
}
