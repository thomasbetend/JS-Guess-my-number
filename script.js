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
let betweenElt = getEltByClass('between');
let choiceElt = getEltByClass('choice');
let btnChoose = getEltByClass('choose');
let btnHighscore = getEltByClass('highscoreBtn');

let gameFinished = false;

function getRandomInt(max) {
    return 1 + Math.floor(Math.random() * (max - 1));
}

let choiceDifficulty = 20;

let currentScore = choiceDifficulty;
let solution = getRandomInt(currentScore);

finalNumberElt.textContent = '?';
scoreElt.textContent = currentScore;
betweenElt.textContent = `[Entre 1 et ${currentScore}]`;
messageElt.style.display = 'none';
finalNumberElt.style.display = 'none';


if (localStorage.getItem('highScore')) {
    highscoreElt.textContent = localStorage.getItem('highScore');
} else {
    highscoreElt.textContent = '0';
}

function resetHighScore () {
    localStorage.setItem('highScore', 0);
    highscoreElt.textContent = '0';
    console.log('ok');
}

function resetGame() {

    /* solution = getRandomInt(currentScore); 
    currentScore = choiceDifficulty;
    finalNumberElt.textContent = '?';
    messageElt.textContent = 'Start guessing...'
    scoreElt.textContent = `${currentScore}`;
    inputElt.value = '';
    finalNumberElt.classList.remove('valid-number');
    inputElt.style.display = 'block';
    finalNumberElt.style.display = 'none'; */  

    location.reload();

    console.log('reset solution >> ', solution);

}

function check() {

    if (gameFinished) return;

    const inputValue = parseInt(inputElt.value);
    messageElt.style.display = 'block';
    messageElt.style.color = 'red';


    if (isNaN(inputValue)) {
        messageElt.textContent = 'Ceci n\'est pas un nombre';
        return;
    }

    if (inputValue === '') {
        messageElt.textContent = 'Ceci n\'est pas un nombre';
        return;
    }

    if (inputValue <= 0 || inputValue > choiceDifficulty) {
        messageElt.textContent = `Le nombre doit être compris entre 1 et ${choiceDifficulty}`;
        return;
    }

    if (currentScore < 2) {
        messageElt.textContent = `PERDU... la solution était ${solution}`;
        scoreElt.textContent = 0;
        gameFinished = true;
        return;
    } 
    
    if (inputValue === solution) {
        messageElt.style.color = 'green';
        messageElt.textContent = 'BRAVO !!!';
        finalNumberElt.textContent = solution;
        scoreElt.textContent = currentScore - 1;
        gameFinished = true;
        finalNumberElt.style.display = 'block';
        finalNumberElt.classList.add('valid-number');
        inputElt.style.display = 'none';

        /* highscore */

        if (!localStorage.getItem('highScore') || currentScore - 1 > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', currentScore - 1);
            highscoreElt.textContent = localStorage.getItem('highScore');
            messageElt.textContent = `BRAVO, vous detenez le nouveau Highscore qui est de ${localStorage.getItem('highScore')} !!!`;
        }
    } else {
        inputElt.classList.add('error-animation');
        setTimeout(() => {
            inputElt.classList.remove('error-animation');
        }, 500);
        if (inputValue < solution) {
            messageElt.textContent = 'Vous êtes en dessous'
        } else {
            messageElt.textContent = 'Vous êtes au dessus'
        }
        currentScore --;
        scoreElt.textContent = currentScore ;
    }



    setTimeout(() => {
        messageElt.style.display = 'none';
    }, 2000);

}

btnPlay.addEventListener('click', check);
btnPlayAgain.addEventListener('click', resetGame);
btnHighscore.addEventListener('click', resetHighScore);

console.log('initial solution >> ', solution);
