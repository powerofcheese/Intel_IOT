
if(IN.in1 === 'fire'){
    if(shared.now_state!=true){
      
var childProcess = require('child_process');
shared.now_state = true;
 sendOUT({
    out1:shared.now_state
});
 shared.n = childProcess.fork('./fire.js',{cwd: __dirname});
}
}
else if (IN.in1 !== 'fire')
{  sendOUT({
    out1:shared.now_state
});
    if(shared.now_state===true)
    {
        shared.n.kill();
        shared.now_state=false;
    }
}
