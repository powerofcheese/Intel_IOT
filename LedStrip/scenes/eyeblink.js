/**
 * Created by sincerty on 16-8-22.
 */
 
 

var lib = require('jsupm_apa102');
var ledstrip = new lib.APA102(96,0);

var STARTTIME = (new Date()).valueOf();

function random(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }

    return Math.floor(Math.random() * (max - min)) + min;
}

function millis() {
    return (new Date()).valueOf() - STARTTIME;
}

function map(x, in_min, in_max, out_min, out_max) {
    return Math.floor( (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min );
}



function Eyeblinks() {

// ledstrip;
   ledstrip.setAllLeds(1,0,0,0);
    this.buffer = new Array(96);
    this.size = 96;
    this.count = 0;

    // Initialize some sub-animations
    this.eyeblinks = [
        new this.Eyeblink({startPos: 0,  color: [255, 0, 0], eyeSep: 2, fadeOutTime: 8000, blinksMax: 6}),
        new this.Eyeblink({startPos: 5, color: [0, 255, 0], eyeSep: 3, fadeInTime: 0, fadeOutTime: 3000}),
        new this.Eyeblink({startPos: 13, color: [255, 0, 127], eyeSep: 1, findInTime: 0, fadeOutTime: 0}),
        new this.Eyeblink({startPos: 19, color: [127, 0, 255], eyeSep: 4, fadeInTime: 5000, blinksMin: 3, blinksMax: 8}),
        new this.Eyeblink({startPos: 27, color: [255, 127, 0], eyeSep: 2})
    ];

    for (var idx = 0, len = this.eyeblinks.length; idx < len; ++idx) {
        this.eyeblinks[idx].parent = this;
    }
}

Eyeblinks.prototype.init = function() {
}

Eyeblinks.prototype.animate = function() {

    if ((this.count++ % 3)) return;
    ledstrip.setAllLeds(1,0,0,0);
    
    // Step through each sub-animation
    for ( var i = 0; i < this.eyeblinks.length; i++ ) {
        this.eyeblinks[i].step(this.buffer);
    }
}

/**
 * Eyeblink prototype
 */
Eyeblinks.prototype.Eyeblink = function(opts) {
    this.parent = {};

    // States
    this.WAITING = 0; // Next = 1
    this.FADEIN  = 1; // Next = 2
    this.ON      = 2; // Next = 3, 4
    this.OFF     = 3; // Next = 2
    this.FADEOUT = 4; // Next = 0

    this.state = this.WAITING;
    this.colorCurrent = [0, 0, 0]; // start at black

    this.fadeInTime = opts.fadeInTime || 200;
    this.fadeOutTime = opts.fadeOutTime || 1200;
    this.color = opts.color || [255, 0, 0];
    this.blinksMin = opts.blinkMin || 1;
    this.blinksMax = opts.blinksMax || 6;
    this.startPos = opts.startPos || 0;
    this.eyeSep = opts.eyeSep || random(1,6);

    this.blinkCount = random(this.blinksMin, this.blinksMax+1);

    this.startEvent = millis();
    this.nextEvent = millis() + random(500, 8000);

    return this;
}

Eyeblinks.prototype.Eyeblink.prototype.step = function(buf) {
    this._step();
    this._draw(buf);
}

Eyeblinks.prototype.Eyeblink.prototype._step = function() {

    switch (this.state) {
        case this.WAITING:
            if (millis() > this.nextEvent) {
                this.state = this.FADEIN;
                this.nextEvent = millis() + this.fadeInTime;
                this.startEvent = millis();
            }
            break;
        case this.FADEIN:
            if (millis() > this.nextEvent) {
                this.state = this.ON;
                this.colorCurrent = this.color;
                this.nextEvent = millis() + random(1000, 4000);
                this.startEvent = millis();
            } else {
                // scale color according to current time, in relation to start/end time
                this.colorCurrent = this.scaleColor(this.color, millis(), this.startEvent, this.nextEvent);
            }
            break;
        case this.ON:
            if (millis() > this.nextEvent) {
                if (this.blinkCount > 0) {
                    // blinking...
                    this.state = this.OFF;
                    this.colorCurrent = [0, 0, 0];
                    this.nextEvent = millis() + random(50, 100);
                    this.startEvent = millis();
                } else {
                    // fade out...
                    this.state = this.FADEOUT
                    this.nextEvent = millis() + this.fadeOutTime;
                    this.startEvent = millis();
                }
            }
            break;
        case this.OFF:
            if (millis() > this.nextEvent) {
                this.state = this.ON;
                this.colorCurrent = this.color;
                this.nextEvent = millis() + random(500, 3000);
                this.startEvent = millis();
                --this.blinkCount;
            }
            break;
        case this.FADEOUT:
            if (millis() > this.nextEvent) {
                this.state = this.WAITING;
                this.colorCurrent = [0, 0, 0];
                this.nextEvent = millis() + random(3000, 60000);
                this.startEvent = millis();
                this.blinkCount = random(this.blinksMin, this.blinksMax+1);
            } else {
                // scale color down according to current time, in relation to start/end time
                this.colorCurrent = this.scaleColor(this.color, millis(), this.nextEvent, this.startEvent);
            }
            break;
        default:
            // this should never happen! but reset, if it does...
            this.state = this.WAITING;
            this.nextEvent = millis() + 5000; // wait 5 seconds
            this.startEvent = millis();
    }

}

Eyeblinks.prototype.Eyeblink.prototype._draw = function(buf) {
    //此时这两个位置会眨眼
    buf[this.startPos] = this.colorCurrent;
    buf[this.startPos + this.eyeSep] = this.colorCurrent;
    ledstrip.setLed(this.startPos,1,buf[this.startPos][0],buf[this.startPos][1],buf[this.startPos][2]);
    ledstrip.setLed(this.startPos+this.eyeSep,1,buf[this.startPos+this.eyeSep][0],
                         buf[this.startPos+this.eyeSep][1],buf[this.startPos+this.eyeSep][2]);
}

Eyeblinks.prototype.Eyeblink.prototype.scaleColor = function(color, scale, min, max) {
    var r = color[0], g = color[1], b = color[2];
    var factor = map(scale, min, max, 0, 255);

    r = Math.floor(r * factor / 255);
    g = Math.floor(g * factor / 255);
    b = Math.floor(b * factor / 255);

    return [r, g, b];
}

var eye = new Eyeblinks();

setInterval(function(){
    eye.animate();
},50)