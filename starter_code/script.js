window.onload = function() {
	var currentGame;
	var canStart = true;

	var Car = function() {
		this.x = 240;
		this.y = 600;
		this.width = 50;
		this.height = 85;
		this.img = "images/car.png";
	}

	Car.prototype.drawCar = function() {
		var theImage = new Image();
		theImage.src = this.img;
		console.log("image is: ", theImage)
		ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
	}

	Car.prototype.move = function(magicalNumber) {
		ctx.clearRect(this.x, this.y, this.width, this.height);

		switch(magicalNumber) {
			case 37: // left
				if(this.canMove(this.x - 5, this.y)) { this.x -= 5; }
				break;
			case 38: // up
				if(this.canMove(this.x, this.y - 5)) { this.y -= 5; }
				break;
			case 39: // right
				if(this.canMove(this.x + 5, this.y)) { this.x += 5; }
				break;
			case 40: // down
				if(this.canMove(this.x, this.y + 5)) { this.y += 5; }
				break;
			default: 
				console.log("oops");
				break;
		}

			this.drawCar();
	}

	Car.prototype.canMove = function(futureX, futureY) {
		var canIMove = true;
		var theObstacle = currentGame.obstacles[0];
		if 	((futureX >= theObstacle.x && futureX <= theObstacle.x + theObstacle.width) && 
			(futureY >= theObstacle.y && futureY <= theObstacle.y + theObstacle.height)) {
				canIMove = false;
		}
		return canIMove;
	}

	var Obstacle = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	
	Obstacle.prototype.draw = function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	var MyCanvas = document.getElementById("theCanvas");
	var ctx = MyCanvas.getContext("2d");
	document.getElementById('start-button').onclick = function() { startGame(); }

	function startGame() {
		if (canStart) {
			currentGame = new Game();
			var theCar = new Car();
			currentGame.car = theCar;
			currentGame.car.drawCar();
			var leftWall = new Obstacle(0, 0, 30, 700);
			var rightWall = new Obstacle(470, 0, 30, 700);
			currentGame.obstacles.push(leftWall, rightWall);
			currentGame.obstacles.forEach(function(oneObstacle){
				oneObstacle.draw();
			});
			canStart = false;
		}
	}

	document.onkeydown = function(event) {
		event.preventDefault();
		var directionCode = event.which;
		currentGame.car.move(directionCode);
	}
}


// window.onload = function() {
// 	document.getElementById("start-button").onclick = function() {
// 		startGame();
// 	};

// 	function startGame() {
// 		var currentGame = new Game();
// 	}
// };