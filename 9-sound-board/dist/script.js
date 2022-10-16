"use strict";
const soundBoard = [
    {
        soundTitle: 'applause',
        soundSrc: 'sounds/sound-board_sounds_applause.mp3',
    },
    {
        soundTitle: 'boo',
        soundSrc: 'sounds/sound-board_sounds_boo.mp3',
    },
    {
        soundTitle: 'gasp',
        soundSrc: 'sounds/sound-board_sounds_gasp.mp3',
    },
    {
        soundTitle: 'tada',
        soundSrc: 'sounds/sound-board_sounds_tada.mp3',
    },
    {
        soundTitle: 'victory',
        soundSrc: 'sounds/sound-board_sounds_victory.mp3',
    },
    {
        soundTitle: 'wrong',
        soundSrc: 'sounds/sound-board_sounds_wrong.mp3',
    },
];
soundBoard.forEach((sound) => {
    const soundEl = document.createElement('audio');
    soundEl.classList.add(`${sound.soundTitle}Sound`);
    soundEl.setAttribute('src', sound.soundSrc);
    document.body.prepend(soundEl);
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = sound.soundTitle;
    console.log(btn, soundEl);
    btn.addEventListener('click', () => {
        stopSongs();
        let songEl = document.querySelector(`.${sound.soundTitle}Sound`);
        songEl === null || songEl === void 0 ? void 0 : songEl.play();
    });
    let buttonsEL = document.getElementById('buttons');
    buttonsEL.appendChild(btn);
});
function stopSongs() {
    soundBoard.forEach((sound) => {
        const song = document.querySelector(`.${sound.soundTitle}Sound`);
        if (song) {
            song.pause();
            song.currentTime = 0;
        }
    });
}
