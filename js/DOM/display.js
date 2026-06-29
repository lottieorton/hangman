import { unhideElement, hideElement } from "./utils.js";

export const renderNextImage = (incorrectGuessesRemaining, guesses, resetGame = false) => {
    let oldImageNumber = guesses - incorrectGuessesRemaining;
    let newImageNumber = resetGame ? 0 : oldImageNumber + 1;
    hideElement(document.querySelector(`#img-${oldImageNumber}`));
    unhideElement(document.querySelector(`#img-${newImageNumber}`));
};

export const renderGameFinishedMessage = (result) => {
    const gamePlayMessage = document.querySelector('.gameplay__result-message');
    gamePlayMessage.innerText = result === 'win' ? 'Wooo, well done on beating the hangman!' : 'They got you this time, better luck next time';
    unhideElement(gamePlayMessage);
}

export const removeGameFinishedMessage = (result) => {
    const gamePlayMessage = document.querySelector('.gameplay__result-message');
    gamePlayMessage.innerText = '';
    hideElement(gamePlayMessage);
}

export const renderScores = (wins, losses) => {
    const winScore = document.querySelector(".scores__title--win");
    const lossScore = document.querySelector(".scores__title--loss");
    winScore.innerText = wins;
    lossScore.innerText = losses;
}

export const renderPlayedWords = wordList => {
    const playedWordEl = document.querySelector(".played-words");
    playedWordEl.innerHTML = `
        <h3 class="played-words__text">Previous words: ${wordList.join(', ')}</h3>
    `;
}