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
const btnChangeGame = getEltByClass('changeGame');
const timer = document.querySelector(".timer");
const chrono = document.querySelector(".chrono");


let difficulty = 0;
let nbTries = 0;
let solution = 0;
localStorage.setItem('highScore', 0);

let gameFinished = false;

gameElt.style.display = 'none';
choiceGlobalElt.style.display = 'block';

function getRandomInt(max) {
    return 1 + Math.floor(Math.random() * (max - 1));
}

let time = 0;

function timerTimer() {

    if(time <= 0) {
        time = 0;
        chrono.style.color = "red";
        chrono.textContent = 'PERDU !!! PLUS DE TEMPS';
        gameFinished = true;
        clearInterval();
        return;
    } 
    time --;
    time <= 10 ? chrono.style.color = 'red' : chrono.style.color = 'white';

    timer.textContent = time;
    console.log(time);
    timer.textContent = time;
}

function chooseDifficulty () {

    difficulty = parseInt(inputDifficultyElt.value);

    if (difficulty < 1 || isNaN(difficulty)) {
        return;
    }
    nbTries = findTwoPower(difficulty);
    time = nbTries * 5;
    timer.textContent = time;
    gameElt.style.display = 'block';
    choiceGlobalElt.style.display = 'none';
    solution = getRandomInt(difficulty);
    scoreElt.textContent = nbTries;
    betweenElt.textContent = `[Entre 1 et ${difficulty}]`;
    messageElt.style.display = 'none';
    finalNumberElt.style.display = 'none';
    console.log(solution);
    setInterval(timerTimer, 1000);

}


/* function power to get nbTries function of difficulty */

function powerNumber(number, power) {
    if (power === 0) {
        return 1;
    }
    if (power > 0) {
        return number * powerNumber(number, power - 1);
    }
}

function findTwoPower(number) {
    let n = 0;
    while (powerNumber(2, n) < number) {
        n ++
    }

    return n ;
}

function resetHighScore () {
    localStorage.setItem('highScore', 0);
    highscoreElt.textContent = '0';
}

function changeDifficulty() {
    location.reload();
    resetHighScore();
}

function keyPlay(event) {
    console.log(event);
    if (KeyboardEvent.key="Enter") check();
    return;
}

function resetGame() {

    nbTries = findTwoPower(difficulty);
    solution = getRandomInt(difficulty); 
    finalNumberElt.textContent = '?';
    scoreElt.textContent = `${nbTries}`;
    inputElt.value = '';
    finalNumberElt.classList.remove('valid-number');
    finalNumberElt.classList.remove('wrong-number');
    inputElt.style.backgroundColor = 'rgb(140, 233, 237)';
    inputElt.style.color = 'black';
    inputElt.style.display = 'block';
    finalNumberElt.style.display = 'none';
    messageElt.style.display = 'none';
    btnPlay.style.display = 'block';
    gameFinished = false;

    time = nbTries * 5;
    chrono.style.color = 'white';
    timer.textContent = time;

    setInterval(timerTimer, 1000);

    console.log('reset solution >> ', solution);
}

function check() {

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

    if (inputValue <= 0 || inputValue > difficulty) {
        messageElt.textContent = `Le nombre doit être compris entre 1 et ${difficulty}`;
        return;
    }

    if (nbTries < 2 && inputValue !== solution) {
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
    }
    
    if (inputValue === solution) {

        messageElt.style.color = 'green';
        messageElt.textContent = 'BRAVO !!!';
        if (nbTries < 2) {
            messageElt.textContent = 'Vous avez ttouvé la solution mais vous ne marquez aucun point...';
        }
        btnPlay.style.display = 'none';
        finalNumberElt.textContent = solution;
        scoreElt.textContent = nbTries - 1;
        gameFinished = true;
        finalNumberElt.style.display = 'block';
        finalNumberElt.classList.add('valid-number');
        inputElt.style.display = 'none';
        console.log(nbTries);

        /* highscore */

        if (!localStorage.getItem('highScore') || nbTries - 1 > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', nbTries - 1);
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
            messageElt.textContent = 'Votre nombre est trop petit'
        } else {
            messageElt.textContent = 'Votre nombre est trop grand'
        }
        nbTries --;
        scoreElt.textContent = nbTries ;
    }
}

btnPlay.addEventListener('click', check);
btnPlayAgain.addEventListener('click', resetGame);
btnHighscore.addEventListener('click', resetHighScore);
btnChangeGame.addEventListener('click', changeDifficulty);
btnChoice.addEventListener('click', chooseDifficulty);

console.log(solution);

