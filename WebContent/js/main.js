var astronautImage;
var canvas;
var astronaut;
var game;
var level1;
var blaster;

/*
function sprite (options) {
	var that = {};
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.direct = 'right';
	that.state = 'stop';
	that.x = 200;
	that.y = 410;
	that.step = 20;
	that.visible = true;
	frameIndex = 0,
	tickCount = 0,
	ticksPerFrame = 0;
	numberOfFrames = options.numberOfFrames || 1;
	
	that.render = function(){
		
		level1.render(that.x, that.y, that.width, that.height);
		
		//that.context.clearRect(that.x, that.y, that.width, that.height);
		
		if (that.state == 'stop'){
			frameIndex = 0;
		}
		
		if (that.state == 'fire'){
			frameIndex = 4;
			blaster.shoot(that.x, that.y, that.direct);
		}
		
		if (that.direct == 'left'){
			that.increacePosition(-that.step);
			that.context.translate(that.width, 0);
			that.context.scale(-1, 1);
			drawImage(-that.x, that.y);
			that.context.translate(that.width, 0);
			that.context.scale(-1, 1);
		}
		
		if (that.direct == 'right'){
			that.increacePosition(that.step);
			drawImage(that.x, that.y);
		}
		
		function drawImage(x, y){
			that.context.drawImage(
					that.image,									//img	Specifies the image, canvas, or video element to use
					frameIndex * (that.width) / numberOfFrames,	//sx	Optional. The x coordinate where to start clipping
					0, 											//sy	Optional. The y coordinate where to start clipping
					that.width / numberOfFrames, 				//swidth	Optional. The width of the clipped image
					that.height, 								//sheight	Optional. The height of the clipped image
					x, 											//x	The x coordinate where to place the image on the canvas
					y, 											//y	The y coordinate where to place the image on the canvas
					that.width / numberOfFrames, 				//width	Optional. The width of the image to use (stretch or reduce the image)
					that.height 								//height	Optional. The height of the image to use (stretch or reduce the image)
				);
		}
		
	};
	
	that.increacePosition = function (x){
		if (that.state != 'stop' && that.state != 'fire'){
			that.x += x;
		}
	}
	
	that.update = function () {
		//tickCount += 1;
		if (frameIndex < 3) {
			//tickCount = 0;
			frameIndex += 1; 
		} else {
			frameIndex = 1;
		}
	};
	
	return that;
}
*/

function gameLoop(sprite){
	var that = {};
	var map = {};
	that.state = false;
	that.interval = 0;
	that.start = function(event){
		
		map[event.keyCode] = event.type == 'keydown';

		if (map[32]){
			sprite.state = 'fire';
			//that.stop();
			sprite.render();
		}
		
		if (map[68] || map[39]){
			sprite.direct = 'right';
			action();
		}
		
		if (map[37] || map[65]){
			sprite.direct = 'left';
			action();
		}

		function action(){
			if (!that.state){
				that.state = true;
				sprite.state = 'go';

				that.interval = setInterval(function(){
					sprite.update();
					sprite.render();
				}, 60);
			}
		}
	}
	
	that.run = function(){
		
	}
	
	that.stop = function(){
		map = {};
		that.state = false;
		clearInterval(that.interval);
		sprite.state = 'stop';
		//sprite.update();
		sprite.render();
	}
	return that;
}

$(document).ready(function(){
	astronautImage = new Image();
	astronautImage.src = "image/astronaut.png";
	canvas = document.getElementById("astronautAnimation");
	canvas.width = 1024;
	canvas.height = 768;

	astronaut = new Astronaut({
		context: canvas.getContext("2d"),
		width: 128,
		height: 128,
		image: astronautImage
	});

	level1 = new Level_1(canvas);
	
	level1.addSceneObjects(astronaut);
	astronaut.render();
	
	game = gameLoop(astronaut);
	window.addEventListener("keydown", function(event){
		game.start(event);
	}, false);
	window.addEventListener("keyup", function(event){
		game.stop();
	}, false);
});