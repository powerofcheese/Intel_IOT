
var lib = require("jsupm_apa102");
var ledstrip = new lib.APA102(96,0);


var lightness = 0;
var choice = 0;

function shining(){
   switch(choice){
       case 0 :
           
           if(lightness === 30){
               choice = 1;
               lightness = 0;
           }
           ledstrip.setLedsBrightness(0,95,lightness);
           break;
       case 1:
           
           if(lightness === 0){
               choice = 0;
               lightness = 30;
           }
            ledstrip.setLedsBrightness(0,95,lightness);
           break;      
   }
  
}

setInterval(shining,50);       
  