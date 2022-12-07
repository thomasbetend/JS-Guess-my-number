'use strict';

const getEltByClass = (className) => {
    return document.querySelector(`.${className}`);
}

let messageElt = getEltByClass('message');
let finalNumberElt = getEltByClass('number');
let scoreElt = getEltByClass('score');
let highscoreElt = getEltByClass('highscore');
let btnPlay = getEltByClass('check');
let inputElt = getEltByClass('guess');
let btnPlayAgain = getEltByClass('again');

function getRandomInt(max) {
    return 1 + Math.floor(Math.random() * (max - 1));
}

let solution = getRandomInt(20);
let nbTries = 20;
let score = 0;
finalNumberElt.textContent = '?';

if (localStorage.getItem('highScore')) {
    highscoreElt.textContent = localStorage.getItem('highScore');
} else {
    highscoreElt.textContent = '0';
}

function resetGame() {

    solution = getRandomInt(20); 
    nbTries = 20;
    finalNumberElt.textContent = '?';
    messageElt.textContent = 'Start guessing...'
    scoreElt.textContent = '20';
    inputElt.value = '';

}

function check() {

    const inputValue = parseInt(inputElt.value);

    if (isNaN(inputValue)) {
        messageElt.textContent = 'Ce n\'est pas un nombre';
        return;
    }

    if (inputValue === '') {
        messageElt.textContent = 'Ce n\'est pas un nombre';
        return;
    }

    if (inputValue <= 0 || inputValue > 20) {
        messageElt.textContent = 'Le nombre doit être compris entre 1 et 20';
        return;
    }

    if (nbTries < 2) {
        messageElt.textContent = `PERDU... la solution était ${solution}`;
        scoreElt.textContent = 0;
    } else {
        if (inputValue === solution) {
            messageElt.textContent = 'BRAVO !!!';
            finalNumberElt.textContent = solution;
            localStorage.setItem('highScore', nbTries);
            highscoreElt.textContent = localStorage.getItem('highScore');
        } else {
            if (inputValue < solution) {
                messageElt.textContent = 'Vous êtes en dessous'
            } else {
                messageElt.textContent = 'Vous êtes au dessus'
            }
            nbTries --;
            scoreElt.textContent = nbTries ;
        }
    }
}

btnPlay.addEventListener('click', check);
btnPlayAgain.addEventListener('click', resetGame);
