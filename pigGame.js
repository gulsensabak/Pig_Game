//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let currentScore = 0;
let activePlayer = 0;

const scores = [0, 0];
let playing = true;

//Starting Conditions:
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  //! Generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Dİsplay dice:
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //Control 1 condition:
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    if (scores[activePlayer] < 100) {
      scores[activePlayer] = scores[activePlayer] + currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 100) {
        diceEl.classList.add("hidden");
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");

        playing = false;
      }
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;

      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
      //
    }
  }
});

btnNew.addEventListener("click", function () {
  //Reset all the game and all the values
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains("player--winner")
  ) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
  }
  activePlayer = 0;
  document.querySelector(`.player--1`).classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");

  diceEl.classList.add("hidden");
  playing = true;

  scores[0] = 0;
  scores[1] = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
});
