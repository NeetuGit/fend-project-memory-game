//timer declarations
 var timer = {
    seconds: 0,
    minutes: 0,
    clearTime: -1
};
 var time;

// Interval function to be called every second, increments timer and updates HTML

 var timerText=document.getElementById('timer');

 var startTimer = function() {
    if (timer.seconds === 59) {
        timer.minutes++;
        timer.seconds = 0;
    } else {
        timer.seconds++;
    }

    // Ensure that single digit seconds are preceded with a 0

 var formattedSec = "0";
    if (timer.seconds < 10) {
        formattedSec += timer.seconds
    } else {
        formattedSec = String(timer.seconds);
    }
    time = String(timer.minutes) + ":" + formattedSec;
	timerText.innerHTML = time;
 };

// Resets timer state and restarts timer

 function resetTimer() {
    clearInterval(timer.clearTime);
    timer.seconds = 0;
    timer.minutes = 0;
	  timerText.innerHTML = "0:00";
    timer.clearTime = setInterval(startTimer, 1000);
 }

//shuffle function from http://stackoverflow.com/a/2450976

 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
 }

// Game state variables

var icons = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor",
           "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
           "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

	var deck = document.querySelector('.deck');
	var shuffledCards;
  var newCards = '';
	var open = [];
	var i;
	var moveCounter = 0;
  var no_ofMoves;
  var matchedCards = 0;

  function startGame() {
	  shuffledCards = shuffle(icons);
	  deck.innerHTML = '';
	  for(i=0;i<shuffledCards.length;i++){
		 newCards += " <li class=\"card\"><i class=\"fa " + shuffledCards[i] + " \"></i></li> ";
	  }
	  deck.innerHTML = newCards;
	}

	function openCards() {
		if(!this.classList.contains('open')){
			this.classList.add('open');
			this.classList.add('show');
			open.push(this);
		   }
		if(open.length>2){
			this.classList.remove('open');
			this.classList.remove('show');
			this.classList.add('card');
			}
		moveCounter++;
	   updateMoveCounter();

	    if(open.length===2)
	     match();
}

function match() {
    if(open[0].firstElementChild.className===open[1].firstElementChild.className)
			 setTimeout(setMatch,300);
		else
			  setTimeout(resetOpen,500);
}

var resetOpen= function() {
    for(i=0;i<open.length;i++){
  		open[i].classList.toggle('open');
  		open[i].classList.toggle('show');
	}
		  open=[];
};
 //star rating
 numberStars=document.getElementsByClassName('fa fa-star');
 var numStars = 3;
 // Difficulty settings (max number of moves for each star)
 const hard = 10;
 const medium = 20;

 var finalStars=document.getElementById('num-stars');
 var moves=document.getElementById('moves');

 function updateMoveCounter() {
  moves.innerHTML='';
	no_ofMoves=parseInt(moveCounter/2);
	moves.innerHTML+=no_ofMoves;
	ratingStars();

	}

function ratingStars() {
	if(no_ofMoves>medium){
			numberStars[0].classList.remove('checked');
			numberStars[1].classList.remove('checked');
			numStars=1;
		}
	else if (no_ofMoves>hard){
			numberStars[0].classList.remove('checked');
			numStars=2;
			}
			finalStars.innerHTML=numStars;
}

 var setMatch = function() {
  open[0].classList.add('match');
	open[1].classList.add('match');
	open=[];
	matchedCards += 2;

	 if (hasWon()) {
       clearInterval(timer.clearTime);
        showModal();
		}
 };

 function hasWon() {
    if (matchedCards === 16) {
        return true;
    } else {
        return false;
    }
}

 var modal=document.getElementById('win-modal');

 function showModal() {
     modal.style.display = "block";
     var allMoves= document.getElementById('totalMoves');
     allMoves.innerHTML = no_ofMoves;
     var totalTime=document.getElementById('complitionTime');
     totalTime.innerHTML=time;
 }

 function resetGame() {
	  location.reload();
 }

 function playAgain() {
    resetGame();
    modal.style.display = "none";
  }

//Game begins here

resetTimer();
startGame();
cards = document.querySelectorAll('.card');

for(i=0;i<cards.length;i++){
  cards[i].addEventListener("click", openCards);
  }

var again = document.getElementById('fa fa-repeat');
again.addEventListener("click", resetGame);
var gameAgain = document.getElementById('play-again');
gameAgain.addEventListener("click", playAgain);
