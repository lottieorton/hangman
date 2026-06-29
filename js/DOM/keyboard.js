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

export const toggleAllKeys = (shouldDisable) => {
    const buttons = document.querySelectorAll('.key-btn');
    buttons.forEach(key => key.disabled = shouldDisable);
};

export const handleKeyboardInput = (e, handleGuess, keyList) => {
    const userLetter = e.key.toLowerCase();
    const charKey = document.querySelector(`#key-${userLetter}`);
    if(keyList.includes(userLetter) && !charKey.disabled) {
        handleGuess(userLetter);
        document.querySelector(`#key-${userLetter}`).disabled = true;
    };
};