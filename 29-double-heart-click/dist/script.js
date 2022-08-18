"use strict";
const loveMe = document.querySelector('.loveMe');
const times = document.querySelector('#times');
let clickTime = 0;
let timesClicked = 0;
loveMe === null || loveMe === void 0 ? void 0 : loveMe.addEventListener('click', (e) => {
    if (clickTime === 0) {
        clickTime = new Date().getTime();
    }
    else {
        if (new Date().getTime() - clickTime < 800) {
            createHeart(e);
            clickTime = 0;
        }
        else {
            clickTime = new Date().getTime();
        }
    }
});
const createHeart = (e) => {
    const heart = document.createElement('i');
    heart.classList.add('fas');
    heart.classList.add('fa-heart');
    const x = e.clientX;
    const y = e.clientY;
    let leftOffset;
    let topOffset;
    if (e.target != null) {
        let clickBox;
        clickBox = e.target;
        leftOffset = clickBox.offsetLeft;
        topOffset = clickBox.offsetTop;
    }
    let xInside;
    let yInside;
    if (leftOffset != undefined && topOffset != undefined) {
        xInside = x - leftOffset;
        yInside = y - topOffset;
    }
    heart.style.top = `${yInside}px`;
    heart.style.left = `${xInside}px`;
    loveMe === null || loveMe === void 0 ? void 0 : loveMe.appendChild(heart);
    if (times != null) {
        times.innerHTML = (++timesClicked).toString();
    }
    setTimeout(() => heart.remove(), 1000);
};
