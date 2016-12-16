var Blaster = function(canvas, level){
	this.width = 50;
	this.height = 50;
	this.x = 0;
	this.y = 0;
	this.shoot_length = 600;
	this.blasterImage = new Image();
	this.blasterImage.src = "image/blaster.png";
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.visible = false;
	this.level = level;
	this.ASTRONAUT_WIDTH = 128;
	this.SHOOT_STEP = 30;
}

Blaster.prototype.render = function(x, y){
	//this.context.clearRect(x, y, this.width, this.height);
	
	this.context.drawImage(this.blasterImage, x, y);
}

Blaster.prototype.shoot = function(x, y, direct){
	var this_ = this;
	//this_.visible = true;
	var length = x + this.shoot_length;
	var interval;
	this_.y = y;

	if(direct == 'left'){
		this_.SHOOT_STEP = -1 * Math.abs(this_.SHOOT_STEP);
		this_.x = x;
		//length = - x + this_.shoot_length;
	} else {
		this_.x = x + this_.ASTRONAUT_WIDTH;
		this_.SHOOT_STEP = Math.abs(this_.SHOOT_STEP);
	}
	
	(function(interval){
		interval = setInterval(function(){
			if(length < this_.x){
				clearInterval(interval);
				this_.visible = false;
				this_.level.clear(this_, this_.x, this_.y);
				this_.level.draw(this_, this_.x, this_.y);
			} else {
				this_.level.clear(this_, this_.x, this_.y);
				this_.level.draw(this_, this_.x, this_.y);
				this_.x += this_.SHOOT_STEP;
				this_.render(this_.x, this_.y);
			}
			
		}, 30);
	})(interval);

}