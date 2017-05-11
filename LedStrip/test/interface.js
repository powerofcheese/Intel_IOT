var lib = require('jsupm_apa102');
var IsOnStep=true;

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

function Single(color){
    var color_data = color.split(" ");
    colornow ='#'+ color_data[0].slice(3);
    tem[0] = colorRgb(colornow);
    for(var i=0;i<96;i++)
    {
        color_arr[i]=tem[0].slice();
    }
}

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
    console.log(color_data);
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
            color_arr[l++]=tem[k];
        }

        k++;
        if(k>=(color_data.length))
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
function gradationskip(color){
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
    var color_data = color.split(" ");
    colornow ='#'+ color_data[0].slice(3);
    tem[0] = colorRgb(colornow);
    var color_value = tem[0][0]+tem[0][1]+tem[0][2];
    console.log(color_value);
    var min = color_value-200;
    var max = color_value+200;
    var l = 0;
    for(var i=0;i<12;i++)
    {
        var data;
        while(true) {
            data = getRGB(min, max);
            //console.log(data);
            if ((data.r + data.g + data.b) >= min && (data.r + data.g + data.b) <= max) {
                console.log('success');
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
// var color ="#ff00ff22 #ff123456 #ff231442 #ff884488 #ff334466";
// gradation(color);

////////////////////////////////////////////////////////////////
function Right(color_arr){
    var last_data = color_arr.pop();
    color_arr.unshift(last_data);
}
function Left(color_arr){
    var first_data = color_arr.shift();
    color_arr.push(first_data);
}
var or=0;
function Swing(color_arr,j){
    if(or<64)
    {Right(color_arr);
        or++;
    }
    else if(or<128)
    {
        Left(color_arr);
        or++;
    }
    else{
        or=0;
    }
}

function Switch(color_arr){
    var tem=[];
    for (var i = 0;i<48;i++)
    {
        tem=color_arr[i+48].slice();
        color_arr[i+48]=color_arr[i].slice();
        color_arr[i]=tem.slice();
    }
}

/////////////////////////////////////////////////////////////////
var lightness = 0;
var choice = 0;
var delay = 8;
var sleep = 8;

function breath(){
    switch(choice){
        case 0 :
            lightness += 1;
            if(lightness >= 30){
                lightness=30;
                choice = 1;
            }
            LedStrip.setLedsBrightness(0,95,lightness);
            // LedStrip.pushState();
            break;
        case 1:
            lightness -= 1;
            
            if(lightness <= 0){
                lightness=0;
                choice = 0;
            }
            LedStrip.setLedsBrightness(0,95,lightness);
            //  LedStrip.pushState();
            break;
    }

}
function shining(){
    switch(choice){
        case 0 :


            choice = 1;
            lightness = 0;

            LedStrip.setLedsBrightness(0,95,lightness);
            break;
        case 1:


            choice = 0;
            lightness = 30;

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
        sleep=8;
    }
    else{
        if(sleep!==0) {
            LedStrip.setLedsBrightness(0, 95, 0);
            sleep--;
        }
        else
            delay=8;
    }
}



////////////////////////////////////////////////////////////////////
var rate = 5;
var rate =1;
var elmH = 0;
var elmS = 0;
var elmV = 0;

function makeColor(elmS,elmH,elmV)
{
    // Don't you think Color Gamut to look like Rainbow?
    var elmR;
    var elmG;
    var elmB;
    elmH = elmH + rate;
    //console.log(elmH);
    if (elmH >= 360)
        elmH = 0;
    // HSVtoRGB
    if (elmS == 0) {
        elmR = elmV;    elmG = elmV;    elmB = elmV;
    }
    else {
        elmH/=60;
        var i = parseInt(elmH);
        var f = elmH-i;
        var a = elmV*(1-elmS);
        var b = elmV*(1-elmS*f);
        var c = elmV*(1-elmS*(1-f));
        switch(i) {
            case 0:
                elmR = elmV
                elmG = c;
                elmB = a;
                break;
            case 1:
                elmR = b;
                elmG = elmV;
                elmB = a;
                break;
            case 2:
                elmR = a;
                elmG = elmV;
                elmB = c;
                break;
            case 3:
                elmR = a;
                elmG = b;
                elmB = elmV;
                break;
            case 4:
                elmR = c;
                elmG = a;
                elmB = elmV;
                break;
            case 5:
                elmR = elmV;
                elmG = a;
                elmB = b;

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

    elmV   =   itemp;
    elmS   =   temp / itemp;//s'=this.sHSV
    if( red == maxRGB ){
        if( green <blue)
            elmH   =   (green-blue)/temp+6;
        else
            elmH   =   (green-blue)/temp;
    }
    else if( green == maxRGB ){

        elmH=2+(blue-red)/temp;
    }
    else if( blue == maxRGB ){
        elmH=4+(red-green)/temp;
    }
    elmH   *=  60;
}


function hue() {
    for (var i = 0; i < 96; i++) {
        toHSV3(color_arr[i][0], color_arr[i][1], color_arr[i][2]);
        color_arr[i] = makeColor(elmS, elmH, elmV).slice();
    }
}
function LedUpdate(){
    for(var i = 0;i<96;i++)
    {
        LedStrip.setLed(i,1,color_arr[i][0],color_arr[i][1],color_arr[i][2]);
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
    animationName = requestanimationNameFrame(this.animate.bind(this)); 	// preserve our context

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




function FadeINFadeOUT(i,end,lightness){

    if (i<(end/2)) {
        lightness+=1;
        LedStrip.setLedsBrightness(0,95,lightness);
        LedStrip.pushState();
        setTimeout(FadeINQuickOUT,50,++i,end,lightness);
    }
    else if((end/2)<=i<end){
        lightness-=1;
        if(lightness<=0)
            lightness=0;

        LedStrip.setLedsBrightness(0,95,lightness);
        LedStrip.pushState();
        setTimeout(FadeINQuickOUT,50,++i,end,lightness);
    }
    else {
        LedStrip.setLedsBrightness(0,95,0);
        iswork=false;
        LedStrip.pushState();
        return;
    }
}
function FadeINQuickOUT(i,end,lightness){

    if (i<(end/2)) {
        lightness+=1;
        LedStrip.setLedsBrightness(0,95,lightness);
        LedStrip.pushState();
        setTimeout(FadeINQuickOUT,50,++i,end,lightness);
    }
    else if((end/2)<=i<end){
        lightness-=5;
        if(lightness<=0)
            lightness=0;

        LedStrip.setLedsBrightness(0,95,lightness);
        LedStrip.pushState();
        setTimeout(FadeINQuickOUT,50,++i,end,lightness);
    }
    else {
        LedStrip.setLedsBrightness(0,95,0);
        iswork=false;
        LedStrip.pushState();
        return;
    }
}
function QuickINQuickOUT(i,end,lightness){

    if (i<end/2) {
        lightness+=5;
        if(lightness>31)
            lightness=31;
        LedStrip.setLedsBrightness(0,95,lightness);
        LedStrip.pushState();
        setTimeout(QuickINQuickOUT,50,++i,end,lightness);
    }
    else if(end/2<=i<end){
        lightness-=5;
        if(lightness<=0)
            lightness=0;
        LedStrip.setLedsBrightness(0,95,lightness);
        LedStrip.pushState();
        setTimeout(QuickINQuickOUT,50,++i,end,lightness);
    }
    else {
        LedStrip.setLedsBrightness(0,95,0);
        iswork=false;
        LedStrip.pushState();
        return;
    }
}


var animationName_i;
var rotationName_i;
var actionName_i;

function s (data_j){
    clearInterval(animationName_i);
    clearInterval(rotationName_i);
    // var data_r = data_j.intColorList.split(" ");
    switch(data_j.patternName){
        case 'Single':
            Single(data_j.intColorList);
            break;
        case 'Gradation':
            gradation(data_j.intColorList);
            break;
        case 'ThinStripe':
            thinStripe(data_j.intColorList);
            break;
        case 'ThickStripe':
            thickStripe(data_j.intColorList);
            break;
        case 'HalfStripe':
            halfStripe(data_j.intColorList);
            break;
        case 'SkipStripe':
            skip(data_j.intColorList);
            break;
        case 'GradationSkipping':
            gradationskip(data_j.intColorList);
            break;
        case 'Random':
            random();
            break;
        case 'RandomSkip':
            randomskip();
            break;
        case 'Similar':
            similar(data_j.intColorList);
            break;
        default:
            Single(data_j.intColorList);
            break;
    }
    if(data_j.rotationName==='Nothing')
    {
        LedUpdate();
    }
    if(data_j.actionName==='Nothing'){
        if(data_j.animationName==='Nothing') {
            switch (data_j.rotationName) {
                case 'FloatRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 100);
                    break;
                case 'FloatLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 100);
                    break;
                case 'RotateRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 50);
                    break;
                case 'RotateLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 50);
                    break;
                case 'SpinRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 20);
                    break;
                case 'SpinLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 20);
                    break;
                case 'Swing':
                    rotationName_i=setInterval(function () {
                        Swing(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 50);
                    break;
                case 'Switch':
                    rotationName_i=setInterval(function () {
                        Switch(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 500);
                    break;
                case 'Snake':
                    rotationName_i=setInterval(function () {
                        Swing(color_arr);
                        LedUpdate();
                        LedStrip.pushState();
                    }, 20);
                    break;
                case 'MovetorotationName':
                    break;
                default:
                    LedUpdate();
                    LedStrip.pushState();
                    break;
            }
        }
        else{
            switch (data_j.rotationName) {
                case 'FloatRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                    }, 100);
                    break;
                case 'FloatLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                    }, 100);
                    break;
                case 'RotateRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                    }, 50);
                    break;
                case 'RotateLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                    }, 50);
                    break;
                case 'SpinRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                    }, 20);
                    break;
                case 'SpinLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                    }, 20);
                    break;
                case 'Swing':
                    rotationName_i=setInterval(function () {
                        Swing(color_arr);
                        LedUpdate();
                    }, 50);
                    break;
                case 'Switch':
                    rotationName_i=setInterval(function () {
                        Switch(color_arr);
                        LedUpdate();
                    }, 500);
                    break;
                case 'Snake':
                    rotationName_i=setInterval(function () {
                        Swing(color_arr);
                        LedUpdate();
                    }, 20);
                    break;
                case 'MovetorotationName':
                    break;
                default:
                    LedUpdate();
                    break;
            }
            switch(data_j.animationName)
            {
                case 'Ramp':
                    animationName_i=setInterval(function(){
                        breath();
                        LedStrip.pushState();
                    },80);
                    break;
                case 'Wave':
                    animationName_i=setInterval(function(){
                        breath();
                        LedStrip.pushState();
                    },19);
                    break;
                case 'Flash':
                    animationName_i=setInterval(function(){
                        breath();
                        LedStrip.pushState()
                    },7);
                    break;
                case 'Strobe':
                    animationName_i=setInterval(function(){
                        shining();
                        LedStrip.pushState();
                    },20);
                    break;
                case 'StrobeInOut':
                    animationName_i=setInterval(function(){
                        StrobeINOut();
                        LedStrip.pushState();
                    },20);
                    break;
                case 'SlowHue':

                    animationName_i=setInterval(function(){

                        hue();
                        LedUpdate();
                        LedStrip.pushState();
                    },100);
                    break;
                case 'HueCycle':
                    LedUpdate();
                    animationName_i=setInterval(function(){
                        hue();
                        LedUpdate();
                        LedStrip.pushState();
                    },50);
                    break;
                case 'HueStrobe':
                    animationName_i=setInterval(function(){
                        hue();
                        LedUpdate();
                        LedStrip.pushState();
                    },20);
                    break;
                default:
                    LedStrip.pushState();
                    break;
            }
        }
    }
    else{
        if(data_j.animationName==='Nothing') {
            switch (data_j.rotationName) {
                case 'FloatRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                        //LedStrip.pushState();
                    }, 100);
                    break;
                case 'FloatLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                        //LedStrip.pushState();
                    }, 100);
                    break;
                case 'RotateRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                        //LedStrip.pushState();
                    }, 50);
                    break;
                case 'RotateLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                        //LedStrip.pushState();
                    }, 50);
                    break;
                case 'SpinRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                        //LedStrip.pushState();
                    }, 20);
                    break;
                case 'SpinLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                        //LedStrip.pushState();
                    }, 20);
                    break;
                case 'Swing':
                    rotationName_i=setInterval(function () {
                        Swing(color_arr);
                        LedUpdate()
                        //LedStrip.pushState();
                    }, 50);
                    break;
                case 'Switch':
                    rotationName_i=setInterval(function () {
                        Switch(color_arr);
                        LedUpdate();
                        //LedStrip.pushState();
                    }, 500);
                    break;
                case 'Snake':
                    rotationName_i=setInterval(function () {
                        Swing(color_arr);
                        LedUpdate();
                        //LedStrip.pushState();
                    }, 20);
                    break;
                case 'MovetorotationName':
                    break;
                default:
                    LedUpdate();
                    //LedStrip.pushState();
                    break;
            }
        }
        else
            switch (data_j.rotationName) {
                case 'FloatRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                    }, 100);
                    break;
                case 'FloatLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                    }, 100);
                    break;
                case 'RotateRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                    }, 50);
                    break;
                case 'RotateLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                    }, 50);
                    break;
                case 'SpinRight':
                    rotationName_i=setInterval(function () {
                        Right(color_arr);
                        LedUpdate();
                    }, 20);
                    break;
                case 'SpinLeft':
                    rotationName_i=setInterval(function () {
                        Left(color_arr);
                        LedUpdate();
                    }, 20);
                    break;
                case 'Swing':
                    rotationName_i=setInterval(function () {
                        Swing(color_arr);
                        LedUpdate();
                    }, 50);
                    break;
                case 'Switch':
                    rotationName_i=setInterval(function () {
                        Switch(color_arr);
                        LedUpdate();
                    }, 500);
                    break;
                case 'Snake':
                    rotationName_i=setInterval(function () {
                        Swing(color_arr);
                        LedUpdate();
                    }, 20);
                    break;
                case 'MovetorotationName':
                    break;
                default:
                    LedUpdate();
                    break;
            }
        switch(data_j.animationName)
        {

            case 'SlowHue':

                animationName_i=setInterval(function(){

                    hue();
                    LedUpdate();
                    // LedStrip.pushState();
                },100);
                break;
            case 'HueCycle':
                LedUpdate();
                animationName_i=setInterval(function(){
                    hue();
                    LedUpdate();
                    //LedStrip.pushState();
                },50);
                break;
            case 'HueStrobe':
                animationName_i=setInterval(function(){
                    hue();
                    LedUpdate();
                    //LedStrip.pushState();
                },20);
                break;
            default:
                //LedStrip.pushState();
                break;
        }
        switch (data_j.actionName)
        {
            case 'QuickINOUT':

                actionName_i=setInterval(
                    function(){
                        if(IsOnStep===false)
                        {   if(iswork===false){
                            LedStrip.setLedsBrightness(0,95,0);
                            LedStrip.pushState();
                        }

                        }
                        else{
                            IsOnStep=false;
                            var lightness3 = 0;
                            iswork=true;
                            QuickINQuickOUT(0,30,lightness3);
                            //iswork=false;
                        }
                    },20);
                break;
            case 'Fade IN OUT':

                actionName_i=setInterval(

                    function(){
                        if(IsOnStep===false)
                        {
                            if(iswork===false) {
                                LedStrip.setLedsBrightness(0, 95, 0);
                                LedStrip.pushState();
                            }
                        }
                        else{
                            IsOnStep=false;
                            var lightness2 = 0;

                            iswork=true;
                            FadeINFadeOUT(0,60,lightness2);

                        }

                    },20);



                break;
            case 'FadeINQuickOut':

                actionName_i=setInterval(
                    function(){
                        if(IsOnStep===false)
                        {   if(iswork===false){
                            LedStrip.setLedsBrightness(0,95,0);
                            LedStrip.pushState();
                        }

                        }
                        else{
                            IsOnStep=false;
                            var lightness3 = 0;
                            iswork=true;
                            FadeINQuickOUT(0,30,lightness3);
                        }
                    },20);
                break;
        }
    }
}






var iswork =false;

// var data_j =   {"patternName":"Single","animationName":"Wave","rotationName":"Nothing","actionName":"Nothing","intColorList":"#FFFF008A"}
// s(data_j);



process.on('message',function(data_j){
    if(data_j === 'Onstep')
    {		IsOnStep=true;

    }
    else{

        
           
        s(JSON.parse(data_j.toString()));
    }
})



