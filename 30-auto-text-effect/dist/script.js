"use strict";
const textEl = document.getElementById('text');
const speedEl = document.getElementById('speed');
const text = 'We love programming';
let idx = 1;
let speedValue;
if (speedEl != null) {
    speedValue = parseInt(speedEl.value);
}
let speed;
if (speedValue != undefined) {
    speed = 300 / speedValue;
}
writeText();
function writeText() {
    textEl.innerText = text.slice(0, idx);
    idx++;
    if (idx > text.length) {
        idx = 1;
    }
    setTimeout(writeText, speed);
}
speedEl.addEventListener('input', (e) => {
    let speedInput = e.target;
    speed = 300 / parseInt(speedInput.value);
});
