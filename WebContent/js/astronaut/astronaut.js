var Astronaut = function(options){
	
	this.context = options.context;
	this.width = options.width;
	this.height = options.height;
	this.image = options.image;
	this.direct = 'right';
	this.state = 'stop';
	this.x = 200;
	this.y = 410;
	this.step = 20;
	this.visible = true;
	this.frameIndex = 0,
	this.tickCount = 0,
	this.ticksPerFrame = 0;
	this. numberOfFrames = options.numberOfFrames || 1;
	this.level = options.level;
	this.blaster = new Blaster(canvas, options.level);
	console.log(options.level);
}

Astronaut.prototype.render = function(){
	
	var this_ = this;
	console.log("js::astronaut::render ");
	this_.level.render(this_.x, this_.y, this_.width, this_.height);
	
	//that.context.clearRect(that.x, that.y, that.width, that.height);
	
	if (this_.state == 'stop'){
		this_.frameIndex = 0;
	}
	
	if (this_.state == 'fire'){
		frameIndex = 4;
		this_.blaster.shoot(this_.x, this_.y, this_.direct);
	}
	
	if (this_.direct == 'left'){
		this_.increacePosition(-this_.step);
		this_.context.translate(this_.width, 0);
		this_.context.scale(-1, 1);
		drawImage(-this_.x, this_.y);
		this_.context.translate(this_.width, 0);
		this_.context.scale(-1, 1);
	}
	
	if (this_.direct == 'right'){
		this_.increacePosition(this_.step);
		drawImage(this_.x, this_.y);
	}
	
	function drawImage(x, y){
		this_.context.drawImage(
				this_.image,												//img	Specifies the image, canvas, or video element to use
				this_.frameIndex * (this_.width) / this_.numberOfFrames,	//sx	Optional. The x coordinate where to start clipping
				0, 															//sy	Optional. The y coordinate where to start clipping
				this_.width / this_.numberOfFrames, 						//swidth	Optional. The width of the clipped image
				this_.height, 												//sheight	Optional. The height of the clipped image
				x, 															//x	The x coordinate where to place the image on the canvas
				y, 															//y	The y coordinate where to place the image on the canvas
				this_.width / this_.numberOfFrames, 						//width	Optional. The width of the image to use (stretch or reduce the image)
				this_.height 												//height	Optional. The height of the image to use (stretch or reduce the image)
			);
	}
	
}

Astronaut.prototype.increacePosition = function (x){
	var this_ = this;
	if (this_.state != 'stop' && this_.state != 'fire'){
		this_.x += x;
	}
}

Astronaut.prototype.update = function () {
	//tickCount += 1;
	var this_ = this;
	if (this_.frameIndex < 3) {
		//tickCount = 0;
		this_.frameIndex += 1; 
	} else {
		this_.frameIndex = 1;
	}
}