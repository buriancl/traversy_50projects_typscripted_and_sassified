"use strict";
const range = document.getElementById('range');
range === null || range === void 0 ? void 0 : range.addEventListener('input', (e) => {
    const eventTarget = e.target;
    if (eventTarget != null) {
        const value = +eventTarget.value;
        const label = eventTarget.nextElementSibling;
        const rangeWidth = getComputedStyle(eventTarget).getPropertyValue('width');
        if (label != null) {
            const labelWidth = getComputedStyle(label).getPropertyValue('width');
            const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
            const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
            const max = +eventTarget.max;
            const min = +eventTarget.min;
            const left = value * (numWidth / max) -
                numLabelWidth / 2 +
                scale(value, min, max, 10, -10);
            label.style.left = `${left}px`;
            console.log(left);
            label.innerHTML = value.toString();
        }
    }
});
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
