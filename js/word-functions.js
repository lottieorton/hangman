export const revealCharacters = (guess, wordArr, hangmanWordArr) => {
    return hangmanWordArr.map((letter, i) => {
        if (wordArr[i] === guess) {
            return guess;
        } else {
            return hangmanWordArr[i];
        }
    });  
};