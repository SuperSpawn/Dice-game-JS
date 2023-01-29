
const imageAddresses = [
    '../assets/images/dice-1.png'
    ,'../assets/images/dice-2.png'
    ,'../assets/images/dice-3.png'
    ,'../assets/images/dice-4.png'
    ,'../assets/images/dice-5.png'
    ,'../assets/images/dice-6.png'
];

const screenMode = getComputedStyle(document.documentElement).getPropertyValue('--mode');


let targetScore = 100;
const startScreen = document.querySelector('.start-menu');
const gameScreen = document.querySelector('.game-screen');

const initButton = document.querySelector('.start-menu .start');

const rollButton = document.querySelector('.middle-section .reroll-button');
const holdButton = document.querySelector('.middle-section .hold-button');
const resetButton = document.querySelector('.middle-section .reset');

const playerDivs = [];
playerDivs[0] = document.querySelector('.player1-div');
playerDivs[1] = document.querySelector('.player2-div');

const playerScoreP = []; 
playerScoreP[0] = document.querySelector('.player1-div .score');
playerScoreP[1] = document.querySelector('.player2-div .score');


const playerCurrentP = [];
playerCurrentP[0] = document.querySelector('.player1-div .current .current-value');
playerCurrentP[1] = document.querySelector('.player2-div .current .current-value');

const endMessages = [];
endMessages[0] = document.querySelector('.player1-div .end-message');
endMessages[1] = document.querySelector('.player2-div .end-message');

const cube1Div = document.querySelector('.middle-section .cube1');
const cube2Div = document.querySelector('.middle-section .cube2');


let playerCurrent = [];
let playerScore = [];

let cube1Value = 4;
let cube2Value = 2;
let currentPlayer = 0;
let gameMode = 'game';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function rollDice() {
    return getRandomInt(6) + 1;
}  

function updateScreen() {
    playerCurrentP[currentPlayer].textContent = `${playerCurrent[currentPlayer]}`;   
    playerScoreP[currentPlayer].textContent = `${playerScore[currentPlayer]}`;
    
}
function swapPlayer() {
    playerDivs[currentPlayer].style.opacity = 0.6;
    if(screenMode === 0) playerDivs[currentPlayer].classList.add('inactive');
    currentPlayer = (currentPlayer == 0) ? 1 : 0;
    playerDivs[currentPlayer].style.opacity = 1;
    if(screenMode === 0) playerDivs[currentPlayer].classList.remove('inactive');;
}
function resetGame() {
    playerCurrent[0] = 0;
    playerCurrent[1] = 0;
    playerScore[0] = 0;
    playerScore[1] = 0;

    

    cube1Value = 4;
    cube2Value = 2;
    currentPlayer = 0;
    gameMode = 'game';
    
    playerCurrentP[0].textContent = `${playerCurrent[0]}`;
    playerCurrentP[1].textContent = `${playerCurrent[1]}`;

    playerScoreP[0].textContent = `${playerScore[0]}`;
    playerScoreP[1].textContent = `${playerScore[1]}`;

    playerDivs[0].style.opacity = 1;
    playerDivs[1].style.opacity = 0.6;


    endMessages[0].style.display = 'none';
    endMessages[1].style.display = 'none';

    updateScreen();
}
function reloadWindow() {
    window.location.reload();
}
function otherPlayer(player) {
    return (player === 0) ? 1 : 0;
}
function endGame(winner) {
    playerDivs[winner].style.backgroundColor = 'black';
    playerDivs[winner].style.color = 'var(--primary-color)';
    turnInvalid(rollButton);
    turnInvalid(holdButton);
    endMessages[winner].textContent = 'You Win!';
    endMessages[winner].style.color = 'var(--primary-color)';
    endMessages[0].style.display = 'contents';
    endMessages[1].style.display = 'contents';
}


function turnInvalid(button) {
    button.style.display = 'none';
}
function turnValid(button) {
    button.style.display = 'contents';
}

initButton.addEventListener("click", function(event) {
    targetScore = document.querySelector('.start-menu input').value;
    startScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    gameMode = 'game';
    initButton.innerText = "Hello";
    resetGame();
    updateScreen();
});

rollButton.addEventListener("click", function(event) {
    cube1Value = rollDice();
    cube2Value = rollDice();
    
    cube1Div.src = imageAddresses[cube1Value - 1];
    cube2Div.src = imageAddresses[cube2Value - 1];

    if((cube1Value === 6) && (cube2Value === 6)) {
        playerCurrent[currentPlayer] = 0;
        swapPlayer();
    }
    else {
        playerCurrent[currentPlayer] += cube1Value + cube2Value;
    }
    
    updateScreen();
});
holdButton.addEventListener('click', function(event) {
    playerScore[currentPlayer] += playerCurrent[currentPlayer];
    playerCurrent[currentPlayer] = 0;
    if(playerScore[currentPlayer] > targetScore) {
        endMessages[currentPlayer].textContent = 'Passed the target score!';
        endGame(otherPlayer(currentPlayer));
    }
    else if(playerScore[currentPlayer] == targetScore) {
        endMessages[otherPlayer(currentPlayer)].textContent = 'You lose!';
        endGame(currentPlayer);
    }
    
    updateScreen();
    swapPlayer();
});
resetButton.addEventListener('click', function(e) {
    resetGame();
    reloadWindow();
    updateScreen();
});


