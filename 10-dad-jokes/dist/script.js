"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');
jokeBtn.addEventListener('click', () => generateJoke());
generateJoke();
//Using async/await
function generateJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                Accept: 'application/json',
            },
        };
        const res = yield fetch('https://icanhazdadjoke.com', config);
        const data = yield res.json();
        jokeEl.innerHTML = data.joke;
    });
}
// Using .then()
// function generateJoke() {
//   const config = {
//     headers: {
//       Accept: "application/json",
//     },
//   };
//   fetch("https://icanhazdadjoke.com", config)
//     .then((res) => res.json())
//     .then((data) => {
//       jokeEl.innerHTML = data.joke;
//     });
// }
