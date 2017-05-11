var work =false;
function setcolor(LedStrip,number,r,g,b){
    var r1 = parseInt(r);
    var g1 = parseInt(g);
    var b1 = parseInt(b);
    if(number!==" "){
    var ledNumber = (parseInt(number))*3;}
    console.log(ledNumber);
    
     LedStrip.setLeds(ledNumber,ledNumber+2,20,r1,g1,b1); 
     LedStrip.pushState();                  

}

var lightness = 0;
var choice = 0;


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

var lightness1 = 0;
var choice1 = 0;

function shining(){
   switch(choice1){
       case 0 :
           
           if(lightness1 === 30){
               choice1 = 1;
               lightness1 = 0;
           }
           LedStrip.setLedsBrightness(0,95,lightness1);
           break;
       case 1:
           
           if(lightness1 === 0){
               choice1 = 0;
               lightness1 = 30;
           }
            LedStrip.setLedsBrightness(0,95,lightness1);    
           break;      
   }
  
}

function ColorCycle () {
    
	this.sequence = [];

	return this;
}

ColorCycle.prototype.scroll = function () {
    var newcolor = this.sequence.shift();
    this.sequence.push(newcolor);
    
}


ColorCycle.prototype.color_cycle = function () {
	for (var idx = 0;idx < 96; ++idx) { //forwards...
	   LedStrip.setLed(idx,5,this.sequence[idx][0],this.sequence[idx][1],this.sequence[idx][2]);
	}

	LedStrip.pushState();
    this.scroll();

};

ColorCycle.prototype.init = function(opt) {
	this.sequence = opt;
};


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


////////////////////////////////////////////////////////////////////////

var lib = require('jsupm_apa102');
var LedStrip=null;
var t1,t2,t3,t4 = null;

///////////////////////////////////////////////////////////////////////

process.on('message',function(data){
    if(work===false){
    
    LedStrip = new lib.APA102(100,0,true);
    
    var arr = data.split(" ");
    setcolor(LedStrip,arr[3],arr[0],arr[1],arr[2]);
            
    work =true;
}


else {
        var arr = data.split(" ");
   
            
            setcolor(LedStrip,arr[3],arr[0],arr[1],arr[2]);
        
       
    
}
});         