var childProcess = require('child_process');
// var led = childProcess.fork('./interface.js',{cwd: __dirname});
// led.send(JSON.stringify({"patternName":"Single","animationName":"Wave","rotationName":"Nothing","actionName":"Nothing","intColorList":"#FFFF008A"}));
// shared.led =childProcess.fork('./interface.js',{cwd: __dirname});

  if(IN.in1==='interface'){    
    if(shared.now_led_state===true)
       shared.led.kill();
       
    shared.now_led_state = true;
    shared.led =childProcess.fork('./interface.js',{cwd: __dirname});
 
    shared.led.send(IN.in2);
    
    

    
}
else if(IN.in1==='Onstep')
{
     shared.led.send(IN.in1);
}
else 
{ 
    if(shared.now_led_state===true)
    {
        shared.led.kill();
        shared.now_led_state=false;
    }
}
 


// hub_shared.step.on('message',function(m){
//         var data = m.toString();
//         if(data === 'Onstep'){
//       sendOUT({
//           out1:here
//       });
//         shared.led.send(data);

//         }
// }