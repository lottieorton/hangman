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
    });
    keysParent.appendChild(key);
};

export const renderNextImage = (incorrectGuessesRemaining, guesses) => {
    let oldImageNumber = guesses - incorrectGuessesRemaining;
    let newImageNumber = oldImageNumber + 1;
    document.querySelector(`#img-${oldImageNumber}`).classList.add("hidden");
    document.querySelector(`#img-${newImageNumber}`).classList.remove("hidden");
};