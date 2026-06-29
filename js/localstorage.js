import { renderScores, renderPlayedWords } from "./DOM/display.js";

export const getCurrentScore = () => {
    const rawScores = localStorage.getItem('scores');
    if(rawScores) {
        const scores = JSON.parse(rawScores);
        const { wins, losses } = scores;
        renderScores(wins, losses);
        return {
            wins: wins,
            losses: losses
        }
    };
    return {
        wins: 0,
        losses: 0
    }
};

export const getPlayedWords = () => { 
    const rawPlayedWords = localStorage.getItem('playedWords');
    if(rawPlayedWords) {
        const playedWords = JSON.parse(rawPlayedWords);
        renderPlayedWords(playedWords);
        return playedWords;
    };
    return [];
}