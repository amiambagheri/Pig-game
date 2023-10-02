'use strict';

// Selecting elelments
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let totalScors, currentScore, activePlayer, playing;

// Starting conditions

const init = function () {
  totalScors = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  currentScore = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  score0El.textContent = totalScors[0];
  score1El.textContent = totalScors[1];
  diceEl.classList.add('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;
    // 3. Check for rolled 1
    if (diceNumber !== 1) {
      // Add the dice number to currect score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's total score
    totalScors[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScors[activePlayer];
    // Check if player total score >= 100
    if (totalScors[activePlayer] >= 20) {
      // Finish game
      diceEl.classList.add('hidden');

      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Reset game

btnNew.addEventListener('click', init);
