'use strict';

const qry = (className) => {
    return document.querySelector(`.${className}`);
}

let messageElt = qry('message');
let finalNumberElt = qry('number');
let scoreElt = qry('score');
let highscoreElt = qry('highscore');
let btnPlay = qry('check');
let inputElt = qry('guess');
let btnPlayAgain = qry('again');

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

    // console.log('New Solution >> ' + solution);
}

function check() {

    const currentValue = parseInt(inputElt.value);

    if (inputElt.value !== '') {

        if (nbTries < 2) {
            messageElt.textContent = `PERDU... la solution était ${solution}`;
            scoreElt.textContent = 0;
        } else {
            if (currentValue === solution) {
                messageElt.textContent = 'BRAVO !!!';
                finalNumberElt.textContent = solution;
                localStorage.setItem('highScore', nbTries);
                highscoreElt.textContent = localStorage.getItem('highScore');
            } else {
                if (currentValue < solution) {
                    messageElt.textContent = 'Vous êtes en dessous'
                } else {
                    messageElt.textContent = 'Vous êtes au dessus'
                }
                nbTries --;
                scoreElt.textContent = nbTries ;
            }
        }

    }
    
}

btnPlay.addEventListener('click', check);
btnPlayAgain.addEventListener('click', resetGame);

// console.log('First Solution >> ' + solution);


/* const changeText = (bool) => {
    setTimeout(() => {
        if (bool) {
            element.textContent = 'Start guessing...'; 
            ponctuation.textContent = '?';
            score.textContent = 20;
        } else {
            element.textContent = 'Good...'; 
            ponctuation.textContent = '!';
            score.textContent = 30;
        }
        changeText(!bool);
    }, 1000);
} */
// changeText();

