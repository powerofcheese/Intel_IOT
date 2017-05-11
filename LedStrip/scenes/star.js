var lib = require("jsupm_apa102");
var ledstrip = new lib.APA102(144,0,true);


function Larson (ledstrip) {
	//opts = opts || {};
	this.ledstrip = ledstrip;
	//this.ledstrip.clear();
	this.direction = 1;
	this.color =  [255,255,255];
	process.on("message",function(data){
	     var arr = data.toString().split(" ");
	    this.color[0]=parseInt(arr[0].toString());
	    this.color[1]=parseInt(arr[1].toString());
	    this.color[2]=parseInt(arr[2].toString());
	})
	// default to white
	this.speed =  2; // run every Nth tick? 1 == full speed
	this.spread = 10; // spread N pixels on either side
	// tick counter
	this.t=0;
    this.Ledlength = 144;
	this.position = 0;

	return this;
}

Larson.prototype.init = function() {return this;};
Larson.prototype.setColor = function(color) {
	this.color = color;
	return this;
};

Larson.prototype.setSpeed = function(speed) {
	this.speed = speed;
	return this;
};

Larson.prototype.setSpread = function(spread) {
	this.spread = spread;
	return this;
};

Larson.prototype.setPosition = function(pos) {
	this.position = pos;
	return this;
};

Larson.prototype.setDirection = function(dir) {
	if (dir >= 0) {
		this.direction = 1;
	} else {
		this.direction = -1;
	}

	return this;
};

Larson.prototype.scan = function (tick) {
	var fade, i, spos, scol;
 	if (!(tick % this.speed === 0)) {return}
 	else{this.t=0;
	    
 	}// speed control

	this.ledstrip.setAllLeds(31,0,0,0);

	// Set the primary dot
	//this.ledstrip.buffer[this.position] = this.color;	
	if(this.position < this.Ledlength){
     
     this.ledstrip.setLed(this.position,5,this.color[0],this.color[1],this.color[2]);
     
	}
     
	// handle spread
	if (this.spread > 0) {
		fade = 1 / (this.spread + 1);

		for (i = 1; i <= this.spread; i++) {
			scol = [
				Math.floor(this.color[0] * ((this.spread + 1 - i) / (this.spread + 1))),
				Math.floor(this.color[1] * ((this.spread + 1 - i) / (this.spread + 1))),
				Math.floor(this.color[2] * ((this.spread + 1 - i) / (this.spread + 1)))
				];
				//console.log(scol[0]);
				
			if (this.position + i < this.Ledlength && this.direction=== -1) {
			    //console.log("");
			   	this.ledstrip.setLed(this.position + i,1,scol[0],scol[1],scol[2]);
			}

			if (this.position - i >= 0&&this.direction === 1) {
				this.ledstrip.setLed(this.position - i,1,scol[0],scol[1],scol[2]);
			}
		}
	}


	/**
	 * Update position and direction for next pass
	 */
	this.position += this.direction;

	// check for out-of-bounds:
	if (this.position >= this.Ledlength) {
		this.position -= 2;
		this.direction = -1; // all skate, reverse direction!
	}
	if (this.position < 0) {
		this.position += 2;
		this.direction = 1;
	}
	 this.ledstrip.pushState();
	//setTimeout(this.ledstrip.pushState,100);

	return this;
}




var Scan = new Larson(ledstrip);

function forImmidiate(i,end){
    if(i<end) {
        ++Scan.t;
        //console.log(Scan.t);
        Scan.scan(Scan.t);
        setTimeout(forImmidiate, 7,i++, end);
    }
    else 
        ledstrip.setAllLeds(31,0,0,0);
        forImmidiate,(0, 863);
}
forImmidiate(0,863);
//setInterval(forImmidiate,100,0