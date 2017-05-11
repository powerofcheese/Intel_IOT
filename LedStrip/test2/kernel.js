
if(IN.in1 === 'wave'){
    if(shared.now_state!==true){
var childProcess = require('child_process');
shared.now_state = true;

 shared.n = childProcess.fork('./colorwave.js',{cwd: __dirname});
}

}
else 
{  
    if(shared.now_state===true)
    {
        shared.n.kill();
        shared.now_state=false;
    }
}       



