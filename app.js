import  wordList  from './assets/word-list.json' with { type: 'json' };

// html elements
const hangmanWordContainer = document.querySelector('.hangman-word-container');


// initial game setup
let word = '';
let wordArr = [];
let hangmanWordArr = [];

const selectWord = () => {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    wordArr = word.split("");
    hangmanWordArr =  wordArr.map(letter => "_");
};
selectWord();

// creating hangman word element
const hangmanWord = document.createElement('h2');
hangmanWord.className = "hangman-word";
hangmanWord.innerHTML = hangmanWordArr.join(' ');
hangmanWordContainer.appendChild(hangmanWord);
