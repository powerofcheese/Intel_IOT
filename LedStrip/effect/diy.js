 var lib = require('jsupm_apa102');
 var LedStrip = new lib.APA102(96,0,true);
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
var colorRgb = function(color){
    var sColor = color.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return sColorChange;
    }else{
        return sColor;
    }
};
function randomColor( ) {
    var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    if (rand.length == 6) {
        return rand;
    } else {
        return randomColor();
    }
}
var colornow;
var tem = [];
var color_arr = new Array(96);

function gradation(color){
    var color_data = color.split(" ");
    var interval = (96-color_data.length)/color_data.length;
    var l =95;
    for(var j = 0;j<color_data.length;j++)
    {
        colornow ='#'+ color_data[j].slice(3);
        tem[j] = colorRgb(colornow);
    }

    for(var i = color_data.length-1;i>0;i--)
    {
        var r = parseInt((tem[i][0]-tem[i-1][0])/interval);
        var g = parseInt((tem[i][1]-tem[i-1][1])/interval);
        var b = parseInt((tem[i][2]-tem[i-1][2])/interval);
        color_arr[l]=tem[i].slice();
        for(var k = 0;k<interval;k++){
            l--;
            // color_arr[l][0]=tem[i][0]-r;
            // color_arr[l][1]=tem[i][1]-g;
            // color_arr[l][2]=tem[i][2]-b;
            tem[i][0]-=r;
            tem[i][1]-=g;
            tem[i][2]-=b;
            color_arr[l]=tem[i].slice();
        }
        l--;
    }
    var r = parseInt((tem[0][0]-tem[color_data.length-1][0])/interval);
    var g = parseInt((tem[0][1]-tem[color_data.length-1][1])/interval);
    var b = parseInt((tem[0][2]-tem[color_data.length-1][2])/interval);
    color_arr[l]=tem[0].slice();
    for(var k = 0;k<interval;k++){
        l--;
        // color_arr[l][0]=tem[0][0]-r;
        // color_arr[l][1]=tem[0][1]-g;
        // color_arr[l][2]=tem[0][2]-b;
        tem[i][0]-=r;
        tem[i][1]-=g;
        tem[i][2]-=b;
        color_arr[l]=tem[i].slice();
    }
}
function thinStripe(color){
    var color_data = color.split(" ");
    for(var j = 0;j<color_data.length;j++)
    {
        colornow ='#'+ color_data[j].slice(3);
        tem[j] = colorRgb(colornow);
    }
    var j=0;
    for(var i = 0;i<96;i++)
    {
        color_arr[i]=tem[j];
        j++;
        if(j>=color_data.length)
            j=0;
    }

}
function thickStripe(color){
    var color_data = color.split(" ");
    for(var j = 0;j<color_data.length;j++)
    {
        colornow ='#'+ color_data[j].slice(3);
        tem[j] = colorRgb(colornow);
    }
    var l = 0;
    var k = 0;
    for(var i = 0;i<6;i++)
    {
        for(var j = 0;j<16;j++)
        {
            color_arr[l++]=tem[k]
        }
        k++;
        if(k>=color_data.length)
            k=0;
    }
}
function halfStripe(color){
    var color_data = color.split(" ");
    for(var j = 0;j<color_data.length;j++)
    {
        colornow ='#'+ color_data[j].slice(3);
        tem[j] = colorRgb(colornow);
    }

    for(var i = 0;i<48;i++)
    {
        color_arr[i]=tem[0];
    }
    for(var i = 48;i<96;i++)
    {
        color_arr[i]=tem[1];
    }
}
function skip(color){
    var color_data = color.split(" ");
    var interval = (96-color_data.length)/color_data.length;
    var l =95;
    for(var j = 0;j<color_data.length;j++)
    {
        colornow ='#'+ color_data[j].slice(3);
        tem[j] = colorRgb(colornow);
    }

    for(var i = color_data.length-1;i>0;i--)
    {
        var r = parseInt((tem[i][0]-tem[i-1][0])/interval);
        var g = parseInt((tem[i][1]-tem[i-1][1])/interval);
        var b = parseInt((tem[i][2]-tem[i-1][2])/interval);
        color_arr[l]=tem[i].slice();
        for(var k = 0;k<interval;k++){
            l--;
            // color_arr[l][0]=tem[i][0]-r;
            // color_arr[l][1]=tem[i][1]-g;
            // color_arr[l][2]=tem[i][2]-b;
            tem[i][0]-=r;
            tem[i][1]-=g;
            tem[i][2]-=b;
            color_arr[l]=tem[i].slice();
        }
        l--;
    }
    var r = parseInt((tem[0][0]-tem[color_data.length-1][0])/interval);
    var g = parseInt((tem[0][1]-tem[color_data.length-1][1])/interval);
    var b = parseInt((tem[0][2]-tem[color_data.length-1][2])/interval);
    color_arr[l]=tem[0].slice();
    for(var k = 0;k<interval;k++){
        l--;
        // color_arr[l][0]=tem[0][0]-r;
        // color_arr[l][1]=tem[0][1]-g;
        // color_arr[l][2]=tem[0][2]-b;
        tem[i][0]-=r;
        tem[i][1]-=g;
        tem[i][2]-=b;
        color_arr[l]=tem[i].slice();
    }
    for(var i=0;i<95;i+=2)
    {
        color_arr[i]=[0,0,0];
    }
}
function random(){
    for(var i=0;i<96;i++){
        color_arr[i]=colorRgb("#"+randomColor());
    }
}
function randomskip(){
    for(var i=0;i<96;i++){
        color_arr[i]=colorRgb("#"+randomColor());
    }
    for(var i=0;i<96;i+=2)
    {
        color_arr[i]=[0,0,0];
    }
}

function getRGB(min, max) {
    var r = min + Math.round(Math.random() * 1000) % (max - min);
    r <= 0 ? 0 : r;
    var g = min + Math.round(Math.random() * 1000) % (max - min);
    g <= 0 ? 0 : g;
    var b = min + Math.round(Math.random() * 1000) % (max - min);
    b <= 0 ? 0 : b;
    return {
        r: r,
        g: g,
        b: b
    };
}
function similar(color){

        colornow ='#'+ color.slice(3);
        tem[0] = colorRgb(colornow);
        var color_value = tem[0][0]+tem[0][1]+tem[0][2];
        var min = color_value-200;
        var max = color_value+200;
        var l = 0;
        for(var i=0;i<12;i++)
        {
            var data;
            while(true) {
                 data = getRGB(min, max);
                if ((data.r + data.g + data.b) >= min && (data.r + data.g + data.b) <= max) {
                    break;
                }
            }
            for(var j =0;j<8;j++)
            {
                color_arr[l]=[data.r,data.g,data.b];
                l++;
            }

        }
}
var color ="#ff00ff22 #ff123456 #ff231442 #ff884488 #ff334466";
gradation(color);

////////////////////////////////////////////////////////////////
function Right(color_arr){
    var last_data = color_arr.pop();
    color_arr.unshift(last_data);
}
function Left(color_arr){
    var first_data = color_arr.shift();
    color_arr.push(first_data);
}

function Swing(color_arr,j){//需要计时器
    if(j==true)
        Right(color_arr);
    else
        Left(color_arr);
}

function Switch(color_arr){
    var tem=[];
    for (var i = 0;i<48;i++)
    {
        tem=color_arr[i+48].slice();
        color_arr[i+48]=color_arr[i].slice();
        color_arr[i]=tem.slice;
    }
}

var lightness = 0;
var choice = 0;
var delay = 4;
var sleep = 4;

function breath(){
    switch(choice){
        case 0 :
            lightness += 1;
            if(lightness === 30){
                choice = 1;
            }
            LedStrip.setLedsBrightness(0,95,lightness);
            LedStrip.pushState();
            break;
        case 1:
            lightness -= 1;
            if(lightness === 0){
                choice = 0;
            }
            LedStrip.setLedsBrightness(0,95,lightness);
            LedStrip.pushState();
            break;
    }

}
function shining(){
    switch(choice){
        case 0 :

            if(lightness1 === 30){
                choice = 1;
                lightness0 = 0;
            }
            LedStrip.setLedsBrightness(0,95,lightness);
            break;
        case 1:

            if(lightness === 0){
                choice = 0;
                lightness = 30;
            }
            LedStrip.setLedsBrightness(0,95,lightness);
            break;
    }

}
function StrobeINOut()
{
    if(delay!==0)
    {
        shining();
        delay--;
        sleep=4;
    }
    else{
        if(sleep!==0) {
            LedStrip.setLedsBrightness(0, 95, 0);
            sleep--;
        }
        else
            delay=4;
    }
}



////////////////////////////////////////////////////////////////////
var rate = 20;
 var elmH = 0;
 var elmS = 128;
 var elmV = 255;
function makeColor(elmS,elmH,elmV)
{
    // Don't you think Color Gamut to look like Rainbow?
    var elmR;
    var elmG;
    var elmB;
    elmH = elmH + rate;
    if (elmH >= 360)
        elmH = 0;
    // HSVtoRGB
    if (elmS == 0) {
        elmR = elmV;    elmG = elmV;    elmB = elmV;
    }
    else {
        t1 = elmV;
        t2 = (255 - elmS) * elmV / 255;
        t3 = elmH % 60;
        t3 = (t1 - t2) * t3 / 60;

        if (elmH < 60) {
            elmR = t1;  elmB = t2;  elmG = t2 + t3;
        }
        else if (elmH < 120) {
            elmG = t1;  elmB = t2;  elmR = t1 - t3;
        }
        else if (elmH < 180) {
            elmG = t1;  elmR = t2;  elmB = t2 + t3;
        }
        else if (elmH < 240) {
            elmB = t1;  elmR = t2;  elmG = t1 - t3;
        }
        else if (elmH < 300) {
            elmB = t1;  elmG = t2;  elmR = t2 + t3;
        }
        else if (elmH < 360) {
            elmR = t1;  elmG = t2;  elmB = t1 - t3;
        }
        else {
            elmR = 0;   elmG = 0;   elmB = 0;
        }
    }
    var r = parseInt(elmR);
    var g = parseInt(elmG);
    var b = parseInt(elmB)
    return [r,g,b];

}
function toHSV3( red , green , blue ){
    var maxRGB  =   Math.max( red , green , blue );//
    var  minRGB  =   Math.min( red , green , blue );
    var  itemp   =   maxRGB;            //v'=itemp
    var  temp    =   maxRGB  -   minRGB;//

    if( maxRGB == minRGB ){
        elmH   =   0;
        elmS   =   0;
        elmV   =   maxRGB / 255;
        return;
    }
    var  rtemp   =   ( itemp - red ) / temp;//r'=rtemp
    var  gtemp   =   ( itemp - green ) / temp;//g'=gtemp
    var  btemp   =   ( itemp - blue ) / temp;//b'=btemp
    // elmV   =   itemp / 255;
    // elmS   =   temp / itemp;//s'=this.sHSV
    if( red == maxRGB ){
        if( green == minRGB )
            elmH   =   5 + btemp;
        else
            elmH   =   1 - gtemp;
    }
    else if( green == maxRGB ){
        if( blue == minRGB )
            elmH   =   1 + rtemp;
        else
            elmH   =   3 - btemp;
    }
    else if( blue == maxRGB ){
        if( red == minRGB )
            elmH   =   3 + gtemp;
        else
            elmH   =   5 - rtemp;
    }
    elmH   *=  60;
}
function hue() {
    for (var i = 0; i < 96; i++) {
        if(color_arr[i])
        toHSV3(color_arr[i][0], color_arr[i][1], color_arr[i][2]);
        color_arr[i] = makeColor(elmS, elmH, elmV).slice();
    }
}




function TwinkleSparkle (ledstrip, opts) {
    opts = opts || {};
    this.ledstrip = ledstrip;
    this.ledstrip.clear();

    this.NUM_LEDS = this.ledstrip.size();

    this.FRAMES_PER_SECOND = 30;
    this.COOLING = 			5;						// controls how quickly LEDs dim
    this.TWINKLING = 		150;					// controls how many new LEDs twinkle
    this.FLICKER = 			50;						// controls how "flickery" each individual LED is

    this.beatInterval = 	8912;     				// the interval at which you want the strip to "sparkle"
    this.nextBeat = 		0;
    this.nextTwinkle = 		3000;     				// twinkling doesn't start until after the sanity check delay
    this.seeds = 			0;
    this.loops = 			0;
    this.deltaTimeTwinkle = 0;
    this.deltaTimeSparkle = 0;
    this.beatStarted = 		false;

    this.heat = [];

    this.t = 0;										// tick counter

    return this;
}

TwinkleSparkle.prototype.init = function() {

    return this;
}

// Get a timestamp for ms milliseconds from now
TwinkleSparkle.prototype.addTime = function (ms) {
    return (new Date()).valueOf() + ms;
}

// Replicate random8() function
TwinkleSparkle.prototype.random8 = function(min, max) {
    if (min === undefined) {
        min = 0;
        max = 255;
    }
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return (Math.round(Math.random() * (max - min)) + min) & 255;
}

// Replicate random16() function
TwinkleSparkle.prototype.random16 = function(min, max) {
    if (min === undefined) {
        min = 0;
        max = 65535;
    }
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return (Math.round(Math.random() * (max - min)) + min) & 65535;
}

TwinkleSparkle.prototype.qadd8 = function(a, b) {
    var tmp = Math.round(a + b);
    if (tmp > 255) tmp = 255;

    return tmp;
}

TwinkleSparkle.prototype.qsub8 = function(a, b) {
    var tmp = Math.round(a - b);
    if (tmp < 0) tmp = 0;

    return tmp;
}


TwinkleSparkle.prototype.millis = function() {
    return (new Date()).valueOf();
}

TwinkleSparkle.prototype.Twinkle = function() {
    // Step 1. Create a randome number of seeds
    this.seeds = this.random8(10,this.NUM_LEDS-10);

    // Step 2. "Cool" down every location on the strip a little
    for( var i = 0; i < this.NUM_LEDS; i++) {
        this.heat[i] = this.qsub8( this.heat[i], this.COOLING);
    }

    // Step 3. Make the seeds into heat on the string
    for ( var j = 0 ; j < this.seeds ; j++) {
        if (this.random16() < this.TWINKLING) {
            this.heat[this.random8(this.NUM_LEDS)] = this.random8(50,255);
        }
    }

    // Step 4. Add some "flicker" to LEDs that are already lit
    //         Note: this is most visible in dim LEDs
    for ( var k = 0 ; k < this.NUM_LEDS ; k++ ) {
        if (this.heat[k] > 0 && this.random8() < this.FLICKER) {
            this.heat[k] = this.qadd8(this.heat[k] , 10);
        }
    }

    // Step 5. Map from heat cells to LED colors
    for( var j = 0; j < this.NUM_LEDS; j++) {
        this.ledstrip.buffer[j] = this.HeatColor( this.heat[j] );
    }
    this.nextTwinkle += 1000 / this.FRAMES_PER_SECOND ; // assign the next time Twinkle() should happen
}

TwinkleSparkle.prototype.Sparkle = function() {
    // Step 1. Make a random numnber of seeds
    this.seeds = this.random8(this.NUM_LEDS - 20 , this.NUM_LEDS);

    // Step 2. Increase the heat at those locations
    for ( var i = 0 ; i < seeds ; i++) {
        var pos = this.random8(this.NUM_LEDS);
        this.heat[pos] = this.random8(50,255);
    }
    this.nextBeat += this.beatInterval; // assign the next time Twinkle() should happen
    this.loops++ ;
}

//Play with this for different strip colors
TwinkleSparkle.prototype.HeatColor = function(temperature) {
    return this.ledstrip.hsl2rgb(29 * (360 / 255), 200/255, temperature/255);
}


TwinkleSparkle.prototype.animate = function() {
    animation = requestAnimationFrame(this.animate.bind(this)); 	// preserve our context

    // Wait for something in the serial monitor before "Sparkling" the first time.
    // This lets you time the sparkle to a particular beat in music.
    // In practice, just type a letter into the serial monitor and press enter
    // when you want the first sparkle to start.

    if (this.loops == 0) {
        this.nextBeat = this.millis();
    }
    else {
        if (this.loops == 0 && this.beatStarted == false) {
            this.nextBeat = this.millis();
            this.beatStarted == true;
            this.Sparkle();
        }
        else {
            this.deltaTimeSparkle = this.millis() - this.nextBeat;
            if ( this.deltaTimeSparkle > 0 ) this.Sparkle(); // if more time than
        }
    }

    this.deltaTimeTwinkle = this.millis() - this.nextTwinkle;
    if ( this.deltaTimeTwinkle > 0 ) {
        this.Twinkle();
    }

    this.ledstrip.send(); // display the LED state

    this.t++; // increment tick
}


console.log();
//random();
// setInterval(function(){
// var data = makeColor(128,0,255);
// console.log(data)},10);