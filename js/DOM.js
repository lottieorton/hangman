export const renderKey = (letter, handlePlayerGuess) => {
    const keysParent = document.querySelector('.keys');
    const key = document.createElement('button');
    key.className = 'key-btn';
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
    const gameFinishedContainer = document.querySelector('.game-finished');
    const message = document.createElement('h2');
    message.className = 'game-finished__message';
    message.innerText = result === 'win' ? 'Wooo, well done on beating the hangman!' : 'They got you this time, better luck next time';
    gameFinishedContainer.appendChild(message);
}

export const removeGameFinishedMessage = (result) => {
    const gameFinishedContainer = document.querySelector('.game-finished');
    gameFinishedContainer.innerHTML = '';
}

export const renderScores = (wins, losses) => {
    const scoresContainer = document.querySelector('.scores-container');
    scoresContainer.innerHTML = `
        <h2>Wins: ${wins}</h2>
        <h2>Losses: ${losses}</h2>
    `;
}

export const renderElement = (element) => {
    element.classList.remove("hidden");
}

export const hideElement = (element) => {
    element.classList.add("hidden");
}