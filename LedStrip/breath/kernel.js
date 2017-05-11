var lightness = 0;
var choice = 0;


function breath(){
   switch(choice){
       case 0 :
           lightness += 1;
           if(lightness === 30){
               choice = 1;
           }
          hub_shared.LedStrip.setLedsBrightness(0,95,lightness);
           break;
       case 1:
           lightness -= 1;
           if(lightness === 0){
               choice = 0;
           }
         hub_shared.LedStrip.setLedsBrightness(0,95,lightness);
           break;      
   }
 
}

if(IN.state==='breath'){
//var childProcess = require('child_process');
shared.now_state = true;

//  shared.n = childProcess.fork('./breath.js',{cwd: __dirname});
//  shared.send(hub_shared.ledstrip);         

// var lib = require("jsupm_apa102");
// var ledstrip = new lib.APA102(96,0);   
 setInterval(breath,50);

}
else if (IN.state !== 'breath')
{  
    if(shared.now_state===true)
    {
           //shared.n.kill();
        shared.now_state=false;
    }
}


// var lib = require("jsupm_apa102");
// var ledstrip = new lib.APA102(96,0);
