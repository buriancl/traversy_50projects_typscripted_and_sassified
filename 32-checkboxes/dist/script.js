"use strict";
const toggles = document.querySelectorAll('.toggle');
const good = document.querySelector('#good');
const cheap = document.querySelector('#cheap');
const fast = document.querySelector('#fast');
toggles.forEach((toggle) => toggle.addEventListener('change', (e) => {
    if (e.target !== null) {
        doTheTrick(e.target);
    }
}));
function doTheTrick(theClickedOne) {
    if ((good === null || good === void 0 ? void 0 : good.checked) && (cheap === null || cheap === void 0 ? void 0 : cheap.checked) && (fast === null || fast === void 0 ? void 0 : fast.checked)) {
        if (good === theClickedOne) {
            fast.checked = false;
        }
        if (cheap === theClickedOne) {
            good.checked = false;
        }
        if (fast === theClickedOne) {
            cheap.checked = false;
        }
    }
}
