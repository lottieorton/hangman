export const renderKey = (letter, handlePlayerGuess) => {
    const keysParent = document.querySelector('.gameplay__keys');
    const key = document.createElement('button');
    key.className = 'btn key-btn';
    key.id = `key-${letter}`;
    key.setAttribute('data-key', letter);
    key.innerHTML = letter;
    key.addEventListener('click', (e) => {
        const letter = e.target.dataset.key;
        handlePlayerGuess(letter);
        e.target.disabled = true;
    });
    keysParent.appendChild(key);
};

export const renderNextImage = (incorrectGuessesRemaining, guesses, resetGame = false) => {
    let oldImageNumber = guesses - incorrectGuessesRemaining;
    let newImageNumber = resetGame ? 0 : oldImageNumber + 1;
    document.querySelector(`#img-${oldImageNumber}`).classList.add("hidden");
    document.querySelector(`#img-${newImageNumber}`).classList.remove("hidden");
};

export const toggleAllKeys = (shouldDisable) => {
    const buttons = document.querySelectorAll('.key-btn');
    buttons.forEach(key => key.disabled = shouldDisable);
}

export const renderGameFinishedMessage = (result) => {
    const gamePlayContainer = document.querySelector('.gameplay');
    const message = document.createElement('h2');
    message.className = 'gameplay__result-message';
    message.innerText = result === 'win' ? 'Wooo, well done on beating the hangman!' : 'They got you this time, better luck next time';
    gamePlayContainer.insertAdjacentElement('afterbegin', message);
}

export const removeGameFinishedMessage = (result) => {
    const gamePlayMessage = document.querySelector('.gameplay__result-message');
    gamePlayMessage.innerHTML = '';
}

export const renderScores = (wins, losses) => {
    const winScore = document.querySelector(".scores__title--win");
    const lossScore = document.querySelector(".scores__title--loss");
    winScore.innerText = wins;
    lossScore.innerText = losses;
}

export const renderElement = (element) => {
    element.classList.remove("hidden");
}

export const hideElement = (element) => {
    element.classList.add("hidden");
}

export const handleKeyboardInput = (e, handleGuess, keyList) => {
    const letter = e.key.toLowerCase();
    if(!keyList.includes(letter)) return;
    const charKey = document.querySelector(`#key-${letter}`);
    if (charKey.disabled) return;
    console.log('button not disabled');
    handleGuess(letter);
    document.querySelector(`#key-${letter}`).disabled = true;
}

export const renderPlayedWords = wordList => {
    const playedWordEl = document.querySelector(".played-words");
    console.log('got');
    playedWordEl.innerHTML = `
    <h3 class="played-words__text">Previous words: ${wordList.join(', ')}</h3>
    `;
}