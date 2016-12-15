var Blaster = function(canvas, level){
	this.width = 50;
	this.height = 50;
	this.x = 0;
	this.y = 0;
	this.shoot_length = 400;
	this.backgroundImage = new Image();
	this.backgroundImage.src = "image/blaster.png";
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.visible = false;
	this.level = level;
}

Blaster.prototype.render = function(x, y){
	//this.context.clearRect(x, y, this.width, this.height);
	
	this.context.drawImage(this.backgroundImage, x, y);
}

Blaster.prototype.shoot = function(x, y, direct){
	var this_ = this;
	//this_.visible = true;
	var interval;
	var length = x + this.shoot_length;
	this_.x = x;
	this_.y = y;
	
	interval = setInterval(function(){
		if(length < this_.x){
			clearInterval(interval);
			this_.visible = false;
			this_.level.clear(this_, this_.x, this_.y);
			this_.level.draw(this_, this_.x, this_.y);
		}
		this_.level.clear(this_, this_.x, this_.y);
		this_.level.draw(this_, this_.x, this_.y);
		this_.x += 30;
		this_.render(this_.x, this_.y);
	}, 10);
	
}