import  wordList  from './assets/word-list.json' with { type: 'json' };
import { renderKey, renderNextImage } from './js/DOM.js';
import { revealCharacters } from './js/word-functions.js';

// html elements
const hangmanWordContainer = document.querySelector('.hangman-word-container');

// initial game setup
const guesses = 9;
let word = '';
let wordArr = [];
let hangmanWordArr = [];
let incorrectGuessesRemaining = 0;

const initialGameSetup = () => {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    wordArr = word.split("");
    hangmanWordArr =  wordArr.map(letter => "_");
    incorrectGuessesRemaining = guesses;
};
initialGameSetup();

// creating hangman word element
const hangmanWord = document.createElement('h2');
hangmanWord.className = "hangman-word";
hangmanWord.innerHTML = hangmanWordArr.join(' ');
hangmanWordContainer.appendChild(hangmanWord);

// handle guess logic
const handlePlayerGuess = (guess) => {
    const charInWord = wordArr.includes(guess);
    if(charInWord) {
        const newWord = revealCharacters(guess, wordArr, hangmanWordArr);
        hangmanWordArr = newWord; 
        hangmanWord.innerHTML = hangmanWordArr.join(' ');
        return;
    } else {
        renderNextImage(incorrectGuessesRemaining, guesses);
        incorrectGuessesRemaining--;
    }
}

// rendering the letter keys
const alphabet = ['a', 'b', 'c', 'd', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
alphabet.forEach((char) => renderKey(char, handlePlayerGuess));