
if(IN.in1 === 'ball'){
    if(shared.now_state!==true){
var childProcess = require('child_process');
shared.now_state = true;
 sendOUT({
    out1:shared.now_state
});
 shared.n = childProcess.fork('./BouncingBall.js',{cwd: __dirname});
}
}
else if (IN.in1 !== 'ball')
{  
    if(shared.now_state===true)
    {
        shared.n.kill();
        shared.now_state=false;
    }
}  