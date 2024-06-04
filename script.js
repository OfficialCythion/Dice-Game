'use strict';

// DEFINE FUNCTIONS //
// SWAPPING PLAYERS TURNS //
const switchPlayer = function () {
	document.getElementById(`current--${playerNum}`).textContent = 0;
	currentScore = 0;
	playerNum = playerNum === 0 ? 1 : 0;
	player0Ele.classList.toggle('player--active');
	player1Ele.classList.toggle('player--active');
};

// RESET GAME CONDITIONS BACK TO INIT STATE //
const init = function () {
	currentScore = 0;
	playerNum = 0;
	scores = [0, 0];
	playing = true;

	score0Ele.textContent = 0;
	score1Ele.textContent = 0;
	current0Ele.textContent = 0;
	current1Ele.textContent = 0;

	diceEle.classList.add('hidden');
	player0Ele.classList.remove('player--winner');
	player1Ele.classList.remove('player--winner');
	player0Ele.classList.add('player--active');
	player1Ele.classList.remove('player--active');
};

// SELECT ELEMENTS //
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.getElementById('score--1');
const current0Ele = document.getElementById('current--0');
const current1Ele = document.getElementById('current--1');
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// INIT STARTING CONDITIONS - VARIBLES HERE DUE TO SCOPING //
let currentScore, playerNum, scores, playing;
init();

// ROLL DICE //
btnRoll.addEventListener('click', function () {
	if (playing) {
		// 1. GENERATE RANDOM DICE ROLL //
		const dice = Math.trunc(Math.random() * 6) + 1;

		// 2. SHOW DICE //
		diceEle.classList.remove('hidden');
		diceEle.src = `dice-${dice}.png`;

		// 3. CHECK IF 1 IS ROLLED. IF SO, SWAP TURNS //
		if (dice !== 1) {
			// ADD CURRENT DICE NUMBER TO SCORE //
			currentScore += dice;
			document.getElementById(`current--${playerNum}`).textContent =
				currentScore;
		} else {
			// SWAP TURNS TO OTHER PLAYER //
			switchPlayer();
		}
	}
});

// ADDING HOLD BUTTON TO SAVE SCORES AND SWAP TURNS //
btnHold.addEventListener('click', function () {
	if (playing) {
		// 1. ADD CURRENT SCORE TO ACTIVE PLAYERS SCORE //
		scores[playerNum] += currentScore;
		document.getElementById(`score--${playerNum}`).textContent =
			scores[playerNum];
		// 2. CHECK SCORE IS 100 MINIMUM //
		// END GAME //
		if (scores[playerNum] >= 50) {
			playing = false;
			diceEle.classList.add('hidden');
			document
				.querySelector(`.player--${playerNum}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${playerNum}`)
				.classList.add('player--active');
		} else {
			// SWAP TO NEXT PLAYER //
			switchPlayer();
		}
	}
});

// NEW GAME BUTTON //
btnNew.addEventListener('click', init);

// TUTORIAL MODAL WINDOW //
// SELECT MODAL WINDOW CLASSES //
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');
const openModalBtn = document.querySelectorAll('.btn--howto');

// CLOSE MODAL //
const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

// OPEN MODAL //
const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

// MODAL LOGIC //
for (let i = 0; i < openModalBtn.length; i++) {
	openModalBtn[i].addEventListener('click', openModal);
}

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// LISTEN FOR 'ESC' TO EXIT MODAL WINDOW //
document.addEventListener('keydown', function (event) {
	console.log(event.key);

	if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});
