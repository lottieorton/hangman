import  wordList  from './assets/word-list.json' with { type: 'json' };
import { renderKey, renderNextImage, toggleAllKeys, renderGameFinishedMessage, removeGameFinishedMessage, renderScores, renderElement, hideElement, handleKeyboardInput, renderPlayedWords } from './js/DOM.js';
import { revealCharacters } from './js/word-functions.js';

// html elements
const hangmanWord = document.querySelector('.hangman-word__header');
const playAgainBtn = document.querySelector('.game-finished__btn');

// initial setup
let wins = 0;
let losses = 0;
const guesses = 10;
let word = '';
let wordArr = [];
let hangmanWordArr = [];
let incorrectGuessesRemaining = 0;
let playedWords = [];

const initialGameSetup = () => {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    wordArr = word.split("");
    hangmanWordArr =  wordArr.map(letter => "_");
    hangmanWord.innerHTML = hangmanWordArr.join(' ');
    incorrectGuessesRemaining = guesses;
    hideElement(playAgainBtn);
};
initialGameSetup();

// grabs existing scores on initial page load
const rawScores = localStorage.getItem('scores');
if(rawScores) {
    const scores = JSON.parse(rawScores);
    wins = scores.wins;
    losses = scores.losses;
    renderScores(wins, losses);
};

const rawPlayedWords = localStorage.getItem('playedWords');
if(rawPlayedWords) {
    playedWords = JSON.parse(rawPlayedWords);
    renderPlayedWords(playedWords);
};



// add event listener to play again button
playAgainBtn.addEventListener('click', (e) => {
    renderNextImage(incorrectGuessesRemaining, guesses, true);
    initialGameSetup();
    toggleAllKeys(false);
    removeGameFinishedMessage();
});

// handle guess logic
const checkIfGameOver = () => {
    if(!hangmanWordArr.includes('_')) return 'win';
    if(incorrectGuessesRemaining === 0) return 'loss';
    return false;
}

const handlePlayerGuess = (guess) => {
    const charInWord = wordArr.includes(guess);
    if(charInWord) {
        const newWord = revealCharacters(guess, wordArr, hangmanWordArr);
        hangmanWordArr = newWord; 
        hangmanWord.innerHTML = hangmanWordArr.join(' ');
    } else {
        renderNextImage(incorrectGuessesRemaining, guesses);
        incorrectGuessesRemaining--;
    }
    const gameResult = checkIfGameOver();
    if(gameResult) {
        gameResult === 'win' ? wins++ : losses++;
        localStorage.setItem('scores', JSON.stringify({wins: wins, losses: losses}));
        renderGameFinishedMessage(gameResult);
        playedWords.push(word);
        localStorage.setItem('playedWords', JSON.stringify(playedWords));
        renderPlayedWords(playedWords);
        renderScores(wins, losses);
        toggleAllKeys(true);
        renderElement(playAgainBtn);
    };
};

// rendering the letter keys
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
alphabet.forEach((char) => renderKey(char, handlePlayerGuess));

// adding in keyboard functionality
document.addEventListener('keydown', event => handleKeyboardInput(event, handlePlayerGuess, alphabet));