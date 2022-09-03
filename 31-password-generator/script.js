var resultEl = document.getElementById('result');
var lengthEl = document.getElementById('length');
var uppercaseEl = document.getElementById('uppercase');
var lowercaseEl = document.getElementById('lowercase');
var numbersEl = document.getElementById('numbers');
var symbolsEl = document.getElementById('symbols');
var generateEl = document.getElementById('generate');
var clipboardEl = document.getElementById('clipboard');
var randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};
clipboardEl.addEventListener('click', function () {
    var textarea = document.createElement('textarea');
    var password = resultEl.innerText;
    if (!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});
generateEl.addEventListener('click', function () {
    var length = +lengthEl.value;
    var hasUpper = uppercaseEl.checked;
    var hasLower = lowercaseEl.checked;
    var hasNumber = numbersEl.checked;
    var hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});
function generatePassword(upper, lower, number, symbol, length) {
    var generatedPassword = '';
    var typesArr = [{ upper: upper }, { lower: lower }, { number: number }, { symbol: symbol }].filter(function (item) { return Object.values(item)[0]; });
    var typesCount = typesArr.length;
    if (typesCount === 0) {
        return '';
    }
    var randomizerArr = [];
    for (var i = 0; i < length; i += 1) {
        randomizerArr.push(typesArr[Math.floor(Math.random() * typesCount)]);
    }
    randomizerArr.forEach(function (type) {
        var funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
    });
    var finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    var symbols = '!@#$%^&*()=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
