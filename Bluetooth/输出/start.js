var spawn = require("child_process").spawn;
var options = {                  
    stdio: ['pipe','pipe','pipe']
}
shared.work=false;
shared.led;
hub_shared.gestureStateList="";





var newcolor=[
    [139, 0, 255],
    [0, 0, 255],
    [0, 127, 255],
    [0, 255, 0],
    [255, 255, 0],
    [255, 165, 0],
    [255, 0, 0]
    ];   
var color = [[255, 0, 0],                                 
             [255, 12, 0],
             [255, 24, 0],
             [255, 36, 0],
             [255, 48, 0],
             [255, 60, 0],
             [255, 72, 0],
             [255, 84, 0],
             [255, 96, 0],
             [255, 108, 0],
             [255, 120, 0],
             [255, 132, 0],
             [255, 144, 0],
              [255, 165, 0],
              [255, 171, 0],
              [255, 177, 0],
              [255, 183, 0],
              [255, 189, 0],
              [255, 195, 0],
              [255, 201, 0],
              [255, 207, 0],
              [255, 213, 0],
              [255, 219, 0],
              [255, 225, 0],
              [255, 231, 0],
              [255, 237, 0],
              [255, 255, 0],
              [234, 255, 0],
              [220, 255, 0],
              [213, 255, 0],
              [200, 255, 0],
              [189, 255, 0],
              [173, 255, 0],
              [168, 255, 0],
              [156, 255, 0],
              [147, 255, 0],
              [134, 255, 0],
              [126, 255, 0],
              [115, 255, 0],
              [105, 255, 0],
              [90, 255, 0],
              [84, 255, 0],
              [70, 255, 0],
              [63, 255, 0],
              [50, 255, 0],
              [42, 255, 0],
              [30, 255, 0],
              [21, 255, 0],
              [0, 255, 21],
              [0, 245, 42],
              [0, 235, 63],
              [0, 225, 84],
              [0, 215, 105],
              [0, 205, 126],
              [0, 195, 147],
              [0, 185, 168],
              [0, 175, 189],
              [0, 165, 210],
              [0, 155, 231],
              [0, 145, 252],
              [0, 135, 252],
              [0, 130, 252],
              [0, 127, 255],
              [0, 117, 255],
              [0, 107, 255],
              [0, 97, 255],
              [0, 87, 255],
              [0, 77, 255],
              [0, 67, 255],
              [0, 57, 255],
              [0, 47, 255],
              [0, 37, 255],
              [0, 27, 255],
              [0, 17, 255],
              [0, 7, 255],
              [0, 0, 255],
              [10, 0, 255],
              [20, 0, 255],
              [30, 0, 255],
              [40, 0, 255],
              [50, 0, 255],
              [60, 0, 255],
              [70, 0, 255],
              [80, 0, 255],
              [90, 0, 255],
              [100, 0, 255],
              [110, 0, 255],
              [120, 0, 255],
              [130, 0, 255],
              [139, 0, 255],
              [139, 0, 255],
              [139, 0, 255],
              [139, 0, 255],
              [139, 0, 255],
              [139, 0, 255],
              [139, 0, 255],
              [139, 0, 255]
            
];         
shared.followMusic=function(data){
    var a = Math.floor((parseInt(data)+ 128)/8);
   if(a>32)
    a=31;
                              
   if(shared.work===false)
   {
       var lib = require("jsupm_apa102");
       shared.led = new lib.APA102(96,0,true);
       shared.work=true;      
   }
       var x = Math.floor(a/5);
        shared.led.setLeds(0,96,a,newcolor[x][0],newcolor[x][1],newcolor[x][2]);
       shared.led.pushState();
   
   
}     
shared.bluetooth = spawn('python',['server.py'],{cwd: __dirname});    

done();  

