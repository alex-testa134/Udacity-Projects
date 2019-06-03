//Creates useful objects for usefulness
let objects = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb']

//Set letiables
let deck = [];
let openCards = [];
let reset = document.querySelector('.restart');
let child;
let clockOff = true;
let clock;
let clockID;
let time;
let timeStat;
let starCount;
let matches;
let shuffledCards = [];
let waitTime = 600;
let DISTINCT_CARDS = 8;
let modal;

$deck = $('.deck');
$moves = $('.moves');
$rating = $('.fa-star'),

//Amount of stars for specific rate
threeStars = 15;
twoStars = 20;
oneStar = 25;

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


//Toggles card to open and show or not
function cardToggle(clickTarget) {
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');
}

//Checks two cards to see if they match
function cardCheck() {
	{
			deck = document.querySelector('.deck');

			deck.addEventListener('click', event => {
			const clickTarget = event.target;

			if (clickTarget.classList.contains('card') && !openCards.includes(clickTarget)){

					if(clockOff){
						clockStart();
						clockOff = false;
					}

					cardToggle(clickTarget)
					openCards.push(clickTarget);

					if(openCards.length == 2) {
						matchCheck();
					}
			}

    //The number of moves are added to the modal HTML alert
    $moves.html(moves);

	//Game finished when every card has a matched
	if (DISTINCT_CARDS == matches) {
		rate(moves);
		let stars = rate(moves).stars;
		setTimeout(function () {
			gameOver(moves, stars);
		}, 750);
	}
});
}
}

//Gives stars based on amount of moves
function rate(moves) {
	let rating = 3;
	if (moves > threeStars && moves < twoStars) {
		$rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
	} else if (moves > twoStars && moves < oneStar) {
		$rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
	} else if (moves > oneStar) {
		$rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	}
	return rating;
}

function matchCheck() {
		moves++;
		//If the cards match, set classList to match and empty openCards
		if (openCards[0].firstElementChild.className ===
			openCards[1].firstElementChild.className) {
			openCards[0].classList.toggle('match');
			openCards[1].classList.toggle('match');
			openCards =[];
			matches++;
		}

		//If the cards do not match, toggle off cards and clear openCards on slight delay
		else {
			setTimeout(function () {
				cardToggle(openCards[0]);
				cardToggle(openCards[1]);
				openCards = [];
			}, waitTime);
		}
	}

function modalToggle() {
	modal = document.querySelector('.modal-background');
	modal.classList.toggle('hide');
	clockStop();
}

function gameOver() {
	timeStat = document.querySelector('.modal-time');
	clock = document.querySelector('.clock').innerHTML;
	starsStat = document.querySelector('.modal-stars');
	movesStat = document.querySelector('.modal-moves');
	moves = document.querySelector('.moves').innerHTML;
	stars = rate(moves);

	starsStat.innerHTML = `You recieved ${stars} stars`;
	timeStat.innerHTML = `Your total time was ${clock} `;
	movesStat.innerHTML = `You used ${moves} moves to win`;
	modalToggle();
}

	document.querySelector('.modal-cancel').addEventListener('click', function () {
		modalToggle();
		clockStart();
	});

	document.querySelector('.modal-restart').addEventListener('click', function () {
		resetGame();
		modalToggle();
	});

//Logs the time the game has been played
function clockStart() {
			time = 0;
			clockID = setInterval( function () {
			time++;
			getTime();
	}, 1000);
}

function clockStop(){
	clearInterval(clockID);
}

function getTime() {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	const clock = document.querySelector('.clock');

	if(seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds} Time`;
	}

	else {
		clock.innerHTML = `${minutes}:${seconds} Time`;
	}
}

	document.querySelector('.restart').addEventListener('click', function () {
		resetGame();
	});

//Resets the game to play again
function resetGame() {
			clockStop();
			clockOff = true;
			document.querySelector('.clock').innerHTML = '0:00 Time';
			$rating.removeClass('fa-star-o').addClass('fa-star');
      let child = deck.lastElementChild;
      while (child) {
          deck.removeChild(child);
          child = deck.lastElementChild;
				}
			start();
	}

//This function starts the game
function start() {

	//Shuffles objects into a random order
	shuffledCards = shuffle(objects);

	moves = 0;
	matches = 0;
	time = 0;
	$moves.text('0');

	//Creates 16 <li> tags with the class of every card
	for (let i = 0; i < shuffledCards.length; i++) {
		$deck.append($('<li class="card"><i class="fa fa-' + shuffledCards[i] + '"></i></li>'))
	}

	cardCheck();
}

start();
