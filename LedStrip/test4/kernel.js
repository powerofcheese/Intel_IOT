
if(IN.in1 === 'star'){
    if(shared.now_state!==true){
var childProcess = require('child_process');
shared.now_state = true;
 shared.n = childProcess.fork('./star.js',{cwd: __dirname});
 if(IN.r!==''&IN.g!==''&IN.b!==''){
     
 process.send(IN.r+' '+IN.g+' '+IN.b);
 }
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