var childProcess = require('child_process');
if(IN.state==='custom'){
    if(shared.now_state===true){
        shared.n.send(IN.r+" "+IN.g+" "+IN.b+" "+IN.number);
    }else{
    shared.now_state = true;
    shared.n =childProcess.fork('./custom.js',{cwd: __dirname});
    shared.n.send(IN.r+" "+IN.g+" "+IN.b+" "+IN.number);
    }
}
else if(IN.state === 'shining'||IN.state === 'breath'){
    shared.n.send(IN.state);
}

else if(IN.state === 'cycle'){
    shared.n.send(IN.color); 
    
}
else 
{ 
    if(shared.now_state===true)
    {
        shared.n.kill();
        shared.now_state=false;
    }
}
