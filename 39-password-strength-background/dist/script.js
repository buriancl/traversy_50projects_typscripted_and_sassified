"use strict";
const backgroundEl = document.getElementById('background');
const passwordInput = document.getElementById('password');
passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.addEventListener('input', (e) => {
    const target = e.target;
    let passwordStrength = target.value.length;
    let blurEffect = 20 - passwordStrength * 2;
    backgroundEl != null
        ? (backgroundEl.style.filter = `blur(${blurEffect}px)`)
        : null;
});
