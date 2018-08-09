
var matrixWrapper = document.getElementById('matrixWrapper'),
	cells = document.querySelectorAll('.cell'),
	startBtn = document.querySelector('.snake-start'),
	stopBtn = document.querySelector('.snake-stop'),
	resetBtn = document.querySelector('.snake-reset'),
	scoreTab = document.querySelector('.snake-info'),
	compilatedMatrix = {};


for (var counter = 0, i = 0; i < 30; i++) {
	compilatedMatrix[i] = [];
	for (var j = 0; j < 30; counter++, j++) {
		compilatedMatrix[i].push(cells[counter]);
	}
}

function Snake () {
	var length = 3,
		start = [10,2],
		end = [start[0], start[1] - 1],
		frontEnd = [end[0], end[1] - 1 + length],
		snakePath = [],
		direction = 'right',
		directionLocal = 'right',
		lost = false,
		eatBounce = true,
		addedBounceNum = 0,
		speed = 250, 
		timerId;

	function getScore () {
		scoreTab.textContent = "You lost. But don't feel upset, give it another try! Your score is: " + (length + addedBounceNum);
	};

	function gameOver () {
		
		getScore();
		setDefault();
		startBtn.removeAttribute('disabled');
	};

	function setDefault () {
		
		clearTimeout(timerId);
		clearFromSnakes();
		clearFromBounce();
		clearSnakePath();
		for (var i = start[1] - 1; i < (start[1] - 1 + length); i++) {
			compilatedMatrix[start[0]][i].classList.add('snake');
		}
		end = [start[0], start[1] - 1];
		frontEnd = [end[0], end[1] - 1 + length];
		direction = 'right';
		directionLocal = 'right';
		lost = true;
		addedBounceNum = 0,
		speed = 300;
	}

	function setBounce () {
		if (eatBounce && !lost) {
				var randomNum = getRandom();

				while (compilatedMatrix[ randomNum[0] ][ randomNum[1] ].classList.contains('snake')) {
					randomNum = getRandom();
				};

				clearFromBounce();
				compilatedMatrix[ randomNum[0] ][ randomNum[1] ].classList.add('bounce');
				speed = (speed > 50) ? (speed - 10) : 50;
				eatBounce = false;
		};
	};

	function getRandom () {
		var num1 = Math.floor((Math.random() * 30)),
			num2 = Math.floor((Math.random() * 30));
		return [num1, num2];
	}

	function clearFromSnakes () {
		for (var i = 0; i <= cells.length - 1; i++) {
			cells[i].classList.remove('snake', 'snake-head');
		};
	}
	function clearFromBounce () {
		for (var i = 0; i <= cells.length - 1; i++) {
			cells[i].classList.remove('bounce');
		};
		eatBounce = true;
	}
	function clearSnakePath () {
		snakePath = [];
	}

	function changePath () {
		
		var turn = {};
		
		turn.prevDir = directionLocal;
		turn.dir = directionLocal = direction;
		turn.coord = [frontEnd[0], frontEnd[1]];
		snakePath.push(turn);

	};

	function setNextEnd () {
		if (eatBounce && addedBounceNum !== 0 || lost) return;
		var nextTurnCoord,
			nextTurnDir,
			endDir = direction;
		if (snakePath[0]) {
			nextTurnCoord = snakePath[0].coord;
			nextTurnDir = snakePath[0].dir;
			endDir = snakePath[0].prevDir;
			if (end[0] === nextTurnCoord[0] && end[1] === nextTurnCoord[1]) {
				endDir = nextTurnDir;
				snakePath.shift();
			};
		};
		compilatedMatrix[ end[0] ][ end[1] ].classList.remove('snake');
		end = (endDir === 'left')    ? [end[0], end[1] - 1] :
			  (endDir === 'up')      ? [end[0] - 1, end[1]] :
			  (endDir === 'right')   ? [end[0], end[1] + 1] :
			  [end[0] + 1, end[1]];

		if (compilatedMatrix[ frontEnd[0] ][ frontEnd[1] ].classList.contains('snake')) {
			gameOver();
		};
	}

	function setNextFrontend () {
		var frontDir = direction; 
		compilatedMatrix[ frontEnd[0] ][ frontEnd[1] ].classList.remove('snake-head');
			frontEnd = (frontDir === 'left')   ? [frontEnd[0], frontEnd[1] - 1] :
				  (frontDir === 'up')      ? [frontEnd[0] - 1, frontEnd[1]] :
				  (frontDir === 'right')   ? [frontEnd[0], frontEnd[1] + 1] :
				  [frontEnd[0] + 1, frontEnd[1]];

		if ( frontEnd[0] < 0  ||
			 frontEnd[1] < 0  ||
			 frontEnd[0] > 29 ||
			 frontEnd[1] > 29 ) {
				gameOver();
				return;
		};

		if (compilatedMatrix[ frontEnd[0] ][ frontEnd[1] ].classList.contains('bounce')) {
			eatBounce = true;
			addedBounceNum++;
		};
		
	}

	// changes direction and saving it in obj by running changePath func
	function changePosition () {

		if (directionLocal !== direction) {
			changePath();
		};
		setNextFrontend();
		setNextEnd();

	}

	// Main function responsible for running, in my case it's making steps
	// From this function controls go to changePostion functionm which calculates coords

	function makeStep () {
		
		changePosition();

		if (lost) return;

		compilatedMatrix[frontEnd[0]][frontEnd[1]].classList.add('snake', 'snake-head');
	}

	// control function with recursive setTimeout for increasing speed with each one bounce

	function setMove() {
		lost = false;
		scoreTab.textContent = '';
		setTimeout(function go () {
			if (lost) return;
				makeStep();
				setBounce();
				setTimeout(go, speed);
			}, speed);
	}

	// blocking too many keypress events 
	function blockDirChange (dirChange) {
		var timerBlock = setTimeout(function () {
			direction = dirChange;
		}, speed - 50);
	}

	function changeDirection(keyCode) {
		if (keyCode === 37) {
			if (direction === 'left' || direction === 'right') return;
			blockDirChange('left');
		} else if (keyCode === 38) {
			if (direction === 'up' || direction === 'down') return;
			blockDirChange('up');
		} else if (keyCode === 39) {
			if (direction === 'right' || direction === 'left') return;
			blockDirChange('right');
		} else if (keyCode === 40) {
			if (direction === 'down' || direction === 'up') return;
			blockDirChange('down');
		} else console.log('Unknown error');
	}

	document.addEventListener('keydown', function (e) {
		e.preventDefault();
		if (e.keyCode >= 37 && e.keyCode <= 40) {
			changeDirection(e.keyCode);
		}
	});


	return {
		setLength: function (num) {
			if (num > 0) {
				length = num;
			}
		},
		setDefaultPosition: function () {
			setDefault();
			startBtn.removeAttribute('disabled');
		},
		setSpeed: function (time) {
			speed = time;	
		},
		run: function () {
			setMove();
			startBtn.setAttribute('disabled', true);
		}
	};
}

// 			Creating new example of snake and set up start position for snake

var snake = new Snake();
snake.setDefaultPosition();

//			Event handlers for managing game control

startBtn.addEventListener('click', function () {
	snake.run();
});
resetBtn.addEventListener('click', function () {
	snake.setDefaultPosition();
});