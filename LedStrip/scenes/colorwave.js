var lib = require("jsupm_apa102");
var ledstrip = new lib.APA102(96,0,true);

function ColorWave (ledstrip) {
    this.ledstrip = ledstrip;
    this.ledstrip.setAllLeds(1,0,0,0);
    this.direction = 1;
    // tick counter
    this.t = 0;
    this.size = 96;
    this.buffer = new Array(96);
    return this;
}

ColorWave.prototype.init = function() {}

/**
 * Map an integer so that 0..ledstrip.len => 0..2PI
 */
ColorWave.prototype.map2PI = function(tick) {
    return Math.PI * 2 * tick / this.size;
}

/**
 * scale values [-1.0, 1.0] to [0, 255]
 */
ColorWave.prototype.scale = function (val) {
    val += 1;     // bump up to a zero base: [0, 2]
    val *= 255/2;  // scale up

    return Math.floor(val); // return int
}

ColorWave.prototype.wave = function () {
    var i, j, rsin, gsin, bsin, size = this.size, offset = this.map2PI(this.t);

    if (Math.random() > .999)  this.direction *= -1; // All skate, reverse direction!

    for (i = 0; i < size; i++) {
      

        j = this.map2PI(i * this.direction) + offset;     // calculate angle
        rsin = Math.sin(j);                         // sin(t)
        gsin = Math.sin(2 * j / 3 + this.map2PI(size / 6)); // sin(2/3 t + 1/3 PI)
        bsin = Math.sin(4 * j / 5 + this.map2PI(size / 3)); // sin(4/5 t + 2/3 PI)

        this.buffer[i] = [this.scale(rsin), this.scale(gsin), this.scale(bsin)];
    }
    this.t++;
    for(i = 0 ; i < size ; i++){
        this.ledstrip.setLed(i,5, this.buffer[i][0],this.buffer[i][1],this.buffer[i][2]);
    }
    this.ledstrip.pushState();

}

var color_wave = new ColorWave(ledstrip);
// function forImmidiate(i,end){
//     if(i<end) {
//         color_wave.wave();
//         setImmediate(forImmidiate, i + 1, end);
//     }
//     else 
//         ledstrip.setAllLeds(1,0,0,0);
// }

setInterval(function(){color_wave.wave();},20);     