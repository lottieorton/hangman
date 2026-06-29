import  wordList  from './assets/word-list.json' with { type: 'json' };
import { renderNextImage,renderGameFinishedMessage, removeGameFinishedMessage, renderScores, renderPlayedWords } from './js/DOM/display.js';
import { renderKey, toggleAllKeys, handleKeyboardInput } from './js/DOM/keyboard.js';
import { unhideElement, hideElement } from './js/DOM/utils.js';
import { revealCharacters, isGameOver } from './js/game-logic.js';
import { getCurrentScore, getPlayedWords } from './js/localstorage.js';

// html elements
const gameWord = document.querySelector('.gameplay__word');
const playAgainBtn = document.querySelector('.gameplay__replay-btn');

// game state
const guesses = 10;
let incorrectGuessesRemaining = 0;
let word = '';
let wordArr = [];
let gameWordArr = [];
let { wins, losses } = getCurrentScore();
let playedWords = getPlayedWords();

// core game logic
const gameSetup = () => {
    // selects a random word and creates both a filled in and blank array for the word 
    word = wordList[Math.floor(Math.random() * wordList.length)];
    wordArr = word.split("");
    gameWordArr =  wordArr.map(letter => "_");

    // renders the word to the page and resets variables and hidden status
    gameWord.innerHTML = gameWordArr.join(' ');
    incorrectGuessesRemaining = guesses;
    hideElement(playAgainBtn);
};

const setGameOver = (gameResult) => {
    gameResult === 'win' ? wins++ : losses++;
    localStorage.setItem('scores', JSON.stringify({wins: wins, losses: losses}));
    renderGameFinishedMessage(gameResult);
    playedWords.push(word);
    localStorage.setItem('playedWords', JSON.stringify(playedWords));
    renderPlayedWords(playedWords);
    renderScores(wins, losses);
    toggleAllKeys(true);
    unhideElement(playAgainBtn);
}

const handlePlayerGuess = (guess) => {
    const charInWord = wordArr.includes(guess);
    if(charInWord) {
        const newWord = revealCharacters(guess, wordArr, gameWordArr);
        gameWordArr = newWord; 
        gameWord.innerHTML = gameWordArr.join(' ');
    } else {
        renderNextImage(incorrectGuessesRemaining, guesses);
        incorrectGuessesRemaining--;
    }
    const gameResult = isGameOver(gameWordArr, incorrectGuessesRemaining);
    if(gameResult) setGameOver(gameResult);
};

// game initialisation
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

gameSetup();

// rendering the letter keys
alphabet.forEach((char) => renderKey(char, handlePlayerGuess));

// keyboard functionality
document.addEventListener('keydown', event => handleKeyboardInput(event, handlePlayerGuess, alphabet));

// play again button listener
playAgainBtn.addEventListener('click', (e) => {
    renderNextImage(incorrectGuessesRemaining, guesses, true);
    gameSetup();
    toggleAllKeys(false);
    removeGameFinishedMessage();
});