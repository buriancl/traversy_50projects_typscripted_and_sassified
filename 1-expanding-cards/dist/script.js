"use strict";
const containerEl = document.querySelector('.container');
const panelData = [
    {
        img: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        title: 'Explore The World',
    },
    {
        img: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        title: 'Wild Forest',
    },
    {
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
        title: 'Sunny Beach',
    },
    {
        img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        title: 'City on Winter',
    },
    {
        img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        title: 'Mountains - Clouds',
    },
    {
        img: 'https://images.unsplash.com/reserve/Pu9MTKTuWOi7dDqIyZqA_urbex-ppc-062.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
        title: 'Railroad - Tunnel',
    },
];
panelData.forEach((panel, i) => {
    const panelEl = document.createElement('div');
    panelEl.classList.add('panel');
    if (i === 0) {
        panelEl.classList.add('active');
    }
    panelEl.style.backgroundImage = `url(${panel.img})`;
    panelEl.innerHTML = `<h3>${panel.title}</h3>`;
    panelEl.addEventListener('click', () => {
        removeActiveClasses();
        panelEl.classList.add('active');
    });
    containerEl === null || containerEl === void 0 ? void 0 : containerEl.append(panelEl);
});
const panels = document.querySelectorAll('.panel');
const removeActiveClasses = () => {
    panels.forEach((panel) => panel.classList.remove('active'));
};
