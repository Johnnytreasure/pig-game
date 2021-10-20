'use strict';

const image = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const playerZeroSection = document.querySelector('.player--0');
const playerOneSection = document.querySelector('.player--1');

let currentPlayer = 'player0';

image.classList.add('hidden');
let activePlayerScoreDisplay = document.querySelector('#current--0');
let activePlayerTotalDisplay = document.querySelector('#score--0');
let activePlayerScore = 0;
let activePlayerTotal = 0;
// Active player counts

let playerZeroTotal = 0;
let playerOneTotal = 0;

// actual player counts

const switchPlayer = function () {
  activePlayerScore = 0;
  activePlayerScoreDisplay.textContent = activePlayerScore;
  if (currentPlayer === 'player0') {
    playerZeroSection.classList.remove('player--active');
    playerOneSection.classList.add('player--active');
    activePlayerScoreDisplay = document.querySelector('#current--1');
    activePlayerTotalDisplay = document.querySelector('#score--1');
    currentPlayer = 'player1';
    // switching selectors and counters across to player1
  } else {
    playerOneSection.classList.remove('player--active');
    playerZeroSection.classList.add('player--active');
    activePlayerScoreDisplay = document.querySelector('#current--0');
    activePlayerTotalDisplay = document.querySelector('#score--0');
    currentPlayer = 'player0';
    // switching selectors and counters across to player0
  }
};

const rollDice = function () {
  let number = Math.trunc(Math.random() * 6) + 1;
  image.classList.remove('hidden');
  image.src = `dice-${number}.png`;

  //   generating random number, showing dice and displaying the correct image
  if (number === 1) {
    activePlayerScore = 0;
    activePlayerScoreDisplay.textContent = activePlayerScore;
    switchPlayer();
    // number is invalid if 1 rolled, switching to other player
  } else {
    activePlayerScore += number;
    activePlayerScoreDisplay.textContent = activePlayerScore;
    // cumulative count of non-1 rolls
  }
};

const hold = function () {
  let currentPlayerTotal = Number(activePlayerTotalDisplay.textContent);
  currentPlayerTotal += activePlayerScore;
  activePlayerTotalDisplay.textContent = currentPlayerTotal;
  // adding current score to total score upon hold
  if (currentPlayerTotal < 100) {
    switchPlayer();
    // game continues to 100
  } else {
    gameOver();
    // player wins game at 100
  }

  // switching active player
};

const reset = function () {
  playerZeroTotal = 0;
  playerOneTotal = 0;
  activePlayerScore = 0;
  activePlayerScoreDisplay.textContent = 0;
  activePlayerTotalDisplay.textContent = 0;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  btnRollDice.addEventListener('click', rollDice);
  btnHold.addEventListener('click', hold);
  playerOneSection.classList.remove('player--winner');
  playerZeroSection.classList.remove('player--winner');
  image.classList.add('hidden');
  // resetting all scores, re-adding ability to play game and removing winning class

  if (currentPlayer === 'player1') {
    playerOneSection.classList.remove('player--active');
    playerZeroSection.classList.add('player--active');
    activePlayerScoreDisplay = document.querySelector('#current--0');
    activePlayerTotalDisplay = document.querySelector('#score--0');
    currentPlayer = 'player0';
    // switching back to player0 to start the game again
  }
};

const gameOver = function () {
  btnRollDice.removeEventListener('click', rollDice);
  btnHold.removeEventListener('click', hold);
  // removing ability to continue playing game and accumulating points
  if (currentPlayer === 'player0') {
    playerZeroSection.classList.add('player--winner');
  } else {
    playerOneSection.classList.add('player--winner');
  }
  // adding winning class to designate winner
};

btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
btnNewGame.addEventListener('click', reset);

// adding event listeners to facilitate game play
