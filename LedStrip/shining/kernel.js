
if(IN.in1 === 'shining'){
var childProcess = require('child_process');
shared.now_state = true;

 shared.n = childProcess.fork('./shining.js',{cwd: __dirname});

}
else if (IN.in1 !== 'shining')
{  
    if(shared.now_state===true)
    {
        shared.n.kill();
        shared.now_state=false;
    }
}