const sounds: string[] = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong']

sounds.forEach((sound) => {
  const btn = document.createElement('button')
  btn.classList.add('btn')

  btn.innerText = sound

  btn.addEventListener('click', () => {
    stopSongs()

    let songEl = document.getElementById(sound) as HTMLAudioElement

    songEl.play()

    // document.getElementById(sound).play()
  })

  let buttonsEL = document.getElementById('buttons') as HTMLDivElement

  buttonsEL.appendChild(btn)
})

function stopSongs() {
  sounds.forEach((sound) => {
    const song = document.getElementById(sound) as HTMLAudioElement

    song.pause()
    song.currentTime = 0
  })
}
