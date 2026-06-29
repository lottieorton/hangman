export const revealCharacters = (guess, wordArr, gameWordArr) => {
    return gameWordArr.map((letter, i) => {
        if (wordArr[i] === guess) {
            return guess;
        } else {
            return gameWordArr[i];
        }
    });  
};

export const isGameOver = (gameWordArr, incorrectGuessesRemaining) => {
    if(!gameWordArr.includes('_')) return 'win';
    if(incorrectGuessesRemaining === 0) return 'loss';
    return false;
};