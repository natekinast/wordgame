import { WORDS } from "./words.js"

const letters = ["A", "A", "A", "B", "C", "D", "D", "E", "E", "E", "F", "G", "H", "I", "I", "J", "K", "L", "L", "M", "N", "N", "O", "O", "O", "P", "Q", "R", "R", "S", "S", "T", "T", "U", "V", "W", "X", "Y", "Z"];

const letterDivs = [...document.querySelectorAll('.letter')];
const messages = document.getElementById('messages');
const input = document.getElementById('enter-guess');
const submitBtn = document.getElementById('check-word');
const newLetterBtn = document.getElementById('new-letter');
const scoreTracker = document.getElementById('score-tracker');
const rowLength = 8;
const wordScore = 6;

let score = 20;
scoreTracker.textContent = score;

document.addEventListener('keydown', (event) => {
  if (event.code.includes('Key')) input.focus();
  if (event.code === "Space") {
    event.preventDefault();
    newLetterBtn.click();
  }
});

input.addEventListener('keyup', (event) => {
  if (event.key === "Enter") submitBtn.click();
});

function modScore(n) {
  let direction = n > 0 ? 'up' : 'down'
  score += n;
  scoreTracker.classList.remove('up');
  scoreTracker.classList.remove('down');
  void scoreTracker.offsetWidth;
  scoreTracker.textContent = score.toString();
  scoreTracker.classList.add(direction);
}

function isOnScreen(word) {
  let lettersInWord = input.value.split('');
  // console.log(lettersInWord)
  let lettersOnScreen = letterDivs
    .filter(div => div.textContent !== "")
    .map(div => div.textContent.toLowerCase());
  // console.log(lettersOnScreen);

  if (lettersOnScreen.length < 5) return false;

  for (let i = 0; i < 5; i++) {
    let checkLetter = lettersInWord[i];
    if (!lettersOnScreen.includes(checkLetter)) {
      return false
    } else {
      lettersOnScreen.splice(lettersOnScreen.indexOf(checkLetter), 1);
    }
  }

  return true;
}

function genLetter() {
  return letters[Math.floor(Math.random() * letters.length)]
}

function addLetter() {
  for (let i = 0; i < letterDivs.length; i++) {
    if (letterDivs[i].textContent === "") {
      letterDivs[i].textContent = genLetter()
      modScore(-Math.ceil((i+1)/rowLength));
      break;
    }
  }
}

function removeWord(word) {
  let currentLetters = letterDivs.map(ele => ele.textContent)
  let remLetters = word.split('');
  
  remLetters.forEach(letter => {
    // console.log(letter);
    currentLetters.splice(currentLetters.indexOf(letter.toUpperCase()), 1)
    currentLetters.push('');
    // console.log(currentLetters)
  })

  for (let i = 0; i < currentLetters.length; i++) {
    letterDivs[i].textContent = currentLetters[i]
  }
}

function checkWord() {
  submitBtn.disabled = true;
  let testWord = input.value;
  // console.log(testWord);
  let message;
  if (!isOnScreen(testWord)) {
    message = "Not on screen!";
  } else if (!WORDS.includes(testWord)) {
    message = "Not in dictionary!";
  } else {
    message = "Word found!";
  }
  messages.style.display = "flex";
  messages.textContent = message;
  if(message === "Word found!") modScore(wordScore);
  setTimeout(()=>{
    messages.style.display = "none";
    if(message === "Word found!") removeWord(testWord);
    input.value = '';
    submitBtn.disabled = false;
  }, 1000)
}

function clickFn(a) {
  switch (a.target.id) {
    case "new-letter":
      addLetter();
      break;
    case "check-word":
      checkWord();
      break;
  }
}

document.addEventListener("click", clickFn);




