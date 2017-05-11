switch(IN.in1){
    case 'ball':
        if(shared.now_state===true)
        {
        shared.n.kill();
        shared.now_state=false;
        }
       shared.now_state = true;
       shared.n = shared.childProcess.fork('./BouncingBall.js',{cwd: __dirname});
       break;
    case 'star':
        if(shared.now_state===true)
        {
        shared.n.kill();
        shared.now_state=false;
        }
        shared.now_state=true;
        shared.n = shared.childProcess.fork('./star.js',{cwd: __dirname});
        if(IN.r!==''&IN.g!==''&IN.b!==''){
            process.send(IN.r+' '+IN.g+' '+IN.b);
        }
        break;
    case 'wave':
         if(shared.now_state===true)
        {
        shared.n.kill();
        shared.now_state=false;
        }
        shared.now_state=true;
        shared.n = shared.childProcess.fork('./colorwave.js',{cwd: __dirname});
        break;
    case 'eye':
          if(shared.now_state===true)
        {
        shared.n.kill();
        shared.now_state=false;
        }
        shared.now_state=true;
        shared.n = shared.childProcess.fork('./eyeblink.js',{cwd: __dirname});
        break;
    case 'go':
         if(shared.now_state===true)
        {
        shared.n.kill();
        shared.now_state=false;
        }
        shared.now_state=true;
        shared.n = shared.childProcess.fork('./go.js',{cwd: __dirname});
        break;
    case 'chaser':
          if(shared.now_state===true)
        {
        shared.n.kill();
        shared.now_state=false;
        }
        shared.now_state=true;
        shared.n = shared.childProcess.fork('./charse.js',{cwd: __dirname});
        break;
    case 'fire':
        if(shared.now_state===true)
        {
        shared.n.kill();
        shared.now_state=false;
        }
        shared.now_state=true;
        shared.n = shared.childProcess.fork('./fire.js',{cwd: __dirname});
        break;
    default:
        if(shared.now_state===true)
        {
        shared.n.kill();
        shared.now_state=false;
        }
        break;
}
     

   

   