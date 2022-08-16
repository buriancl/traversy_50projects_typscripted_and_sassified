"use strict";
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggle = document.querySelector('.toggle');
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
if (toggle != null) {
    toggle.addEventListener('click', (e) => {
        let html;
        if (document.querySelector('html') != null) {
            html = document.querySelector('html');
        }
        if (html != undefined) {
            if (html.classList.contains('dark') &&
                e.target != undefined &&
                e.target instanceof Element) {
                html.classList.remove('dark');
                e.target.innerHTML = 'Dark mode';
            }
            else if (e.target != undefined && e.target instanceof Element) {
                html.classList.add('dark');
                e.target.innerHTML = 'Light mode';
            }
        }
    });
}
function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const hoursForClock = hours % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    if (hourEl != null) {
        hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`;
    }
    if (minuteEl != null) {
        minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;
    }
    if (secondEl != null) {
        secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;
    }
    if (timeEl != null) {
        timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    }
    if (dateEl != null) {
        dateEl.innerHTML = `${days[day]}, ${months[month]} <span class='circle'>${date}</span>`;
    }
}
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
setTime();
setInterval(setTime, 1000);
