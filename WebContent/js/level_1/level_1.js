var Level_1 = function(canvas){
	this.width = 1600;
	this.height = 640;
	this.x = 0;
	this.y = 0;
	this.backgroundImage = new Image();
	this.backgroundImage.src = "image/spacecraft.png";
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.drawBackground();
	this.sceneObjects = [];
}

Level_1.prototype.addSceneObjects = function(object){
	this.sceneObjects.push(object);
}

Level_1.prototype.drawBackground = function(){
	this.context.clearRect(this.x, this.y, this.width, this.height);
	this.context.drawImage(this.backgroundImage, this.x, this.y);
}

Level_1.prototype.render = function(x, y, width, height){
	
	for (var key in this.sceneObjects){
		if (this.sceneObjects[key].visible){
			this.context.clearRect(this.sceneObjects[key].x, this.sceneObjects[key].y, this.sceneObjects[key].width, this.sceneObjects[key].height);
		}
	}
	
	this.context.drawImage(
			this.backgroundImage,						//img	Specifies the image, canvas, or video element to use
			x,											//sx	Optional. The x coordinate where to start clipping
			y, 											//sy	Optional. The y coordinate where to start clipping
			width, 										//swidth	Optional. The width of the clipped image
			height, 									//sheight	Optional. The height of the clipped image
			x, 											//x	The x coordinate where to place the image on the canvas
			y, 											//y	The y coordinate where to place the image on the canvas
			width, 										//width	Optional. The width of the image to use (stretch or reduce the image)
			height
	);
}

Level_1.prototype.clear = function(object, x, y){
	
	this.context.clearRect(object.x, object.y, object.width, object.height);
	
}

Level_1.prototype.draw = function(object, x, y){

	this.context.drawImage(
			this.backgroundImage,						//img	Specifies the image, canvas, or video element to use
			object.x,											//sx	Optional. The x coordinate where to start clipping
			object.y, 											//sy	Optional. The y coordinate where to start clipping
			object.width, 										//swidth	Optional. The width of the clipped image
			object.height, 									//sheight	Optional. The height of the clipped image
			x, 											//x	The x coordinate where to place the image on the canvas
			y, 											//y	The y coordinate where to place the image on the canvas
			object.width, 										//width	Optional. The width of the image to use (stretch or reduce the image)
			object.height
	);
	
}