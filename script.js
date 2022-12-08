'use strict';


const getEltByClass = (className) => {
    return document.querySelector(`.${className}`);
}

const messageElt = getEltByClass('message');
const finalNumberElt = getEltByClass('number');
const scoreElt = getEltByClass('score');
const highscoreElt = getEltByClass('highscore');
const btnPlay = getEltByClass('check');
const inputElt = getEltByClass('guess');
const btnPlayAgain = getEltByClass('again');
const betweenElt = getEltByClass('between');
const choiceElt = getEltByClass('choice');
const btnChoose = getEltByClass('choose');
const btnHighscore = getEltByClass('highscoreBtn');
const btnChoice = getEltByClass('choiceBtn');
const inputDifficultyElt = getEltByClass('difficulty');
const gameElt = getEltByClass('game');
const choiceGlobalElt = getEltByClass('choiceGlobal');

let gameFinished = false;

function getRandomInt(max) {
    return 1 + Math.floor(Math.random() * (max - 1));
}


gameElt.style.display = 'none';
choiceGlobalElt.style.display = 'block';

let currentScore = 0;
let solution = getRandomInt(currentScore);

btnChoice.addEventListener('click', chooseDifficulty);


function chooseDifficulty () {
    currentScore = parseInt(inputDifficultyElt.value);
    gameElt.style.display = 'block';
    choiceGlobalElt.style.display = 'none';
    solution = getRandomInt(currentScore);
    finalNumberElt.textContent = '?';
    scoreElt.textContent = currentScore;
    betweenElt.textContent = `[Entre 1 et ${currentScore}]`;
    messageElt.style.display = 'none';
    finalNumberElt.style.display = 'none';
    console.log('ok');
}


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

    console.log(gameFinished);

    if (gameFinished) return;

    const inputValue = parseInt(inputElt.value);
    messageElt.style.display = 'block';
    messageElt.style.color = 'rgb(140, 233, 237)';


    if (isNaN(inputValue)) {
        messageElt.textContent = 'Vous devez rentrer un nombre';
        return;
    }

    if (inputValue === '') {
        messageElt.textContent = 'Vous devez rentrer un nombre';
        return;
    }

    if (inputValue <= 0 || inputValue > currentScore) {
        messageElt.textContent = `Le nombre doit être compris entre 1 et ${currentScore}`;
        return;
    }

    if (currentScore < 2) {
        messageElt.style.color = 'rgb(153, 1, 54)';
        messageElt.textContent = `PERDU... la solution était ${solution}`;
        btnPlay.style.display = 'none';
        finalNumberElt.style.display = 'block';
        finalNumberElt.textContent = solution;
        finalNumberElt.classList.add('wrong-number');
        inputElt.style.display = 'none';
        scoreElt.textContent = 0;
        gameFinished = true;
        return;

    } else {
    
        if (inputValue === solution) {
            messageElt.style.color = 'green';
            messageElt.textContent = 'BRAVO !!!';
            btnPlay.style.display = 'none';
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
            inputElt.style.backgroundColor = ' rgb(153, 1, 54)';
            inputElt.style.color = 'white';
            
            setTimeout(() => {
                inputElt.style.backgroundColor = 'rgb(153, 1, 54)';
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
    }

}

btnPlay.addEventListener('click', check);
btnPlayAgain.addEventListener('click', resetGame);
btnHighscore.addEventListener('click', resetHighScore);

console.log('initial solution >> ', solution);
