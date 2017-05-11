
if(IN.in1 === 'eye'){
    if(shared.now_state!==true){
var childProcess = require('child_process');
shared.now_state = true;
 shared.n = childProcess.fork('./eyeblink.js',{cwd: __dirname});
}
}
else if (IN.in1 !== 'eye')
{  
    if(shared.now_state===true)
    {
        shared.n.kill();
        shared.now_state=false;
    }      
}  