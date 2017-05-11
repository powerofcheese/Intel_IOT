var lib = require("jsupm_apa102");
var ledstrip = new lib.APA102(96,0,true);
function ColorCycle () {
    
	this.sequence = [];

	return this;
}

ColorCycle.prototype.scroll = function () {
    var newcolor = this.sequence.shift();
    this.sequence.push(newcolor);
    //this.ledstrip.send();
}


ColorCycle.prototype.color_cycle = function () {
	//animation = requestAnimationFrame(this.color_cycle.bind(this));

   sendOUT({out1:"success here"});
  // sendOUT({out1:this.squence.length});
	for (var idx = 0;idx < 96; ++idx) { //forwards...
	   ledstrip.setLed(idx,1,this.sequence[idx][0],this.sequence[idx][1],this.sequence[idx][2]);
	}
sendOUT({out1:"successyet here"});
	ledstrip.pushState();
    this.scroll();

};

ColorCycle.prototype.init = function(opt) {
	this.sequence = opt;
// 			[0, 25, 50],
// 			[0, 50, 100],
// 			[0, 75, 150],
// 			[25, 75, 100],
// 			[50, 100, 125],
// 			[75, 125, 100],
// 			[100, 125, 100],
// 			[125, 125, 100],
// 			[150, 125, 100],
// 			[175, 125, 100],
// 			[250, 125, 100],
// 			[250, 100, 75],
// 			[250, 75, 50],
// 			[250, 50, 25],
// 			[250, 0, 0]
// 	];

};


var opt = new Array(96);
var colornow;
if(IN.in1==='###'){
    var data = IN.in2;
   // sendOUT({out1:data});
    var arr = data.toString().split(" ");
    var i = 0;
    var tem = [];
    for(var j = 0;j<(arr.length-1);j++)
    {   colornow ='#'+ arr[j+1].slice(3);
        tem = shared.colorRgb(colornow);
        opt[i]=tem.slice();
        opt[++i]=tem.slice();
        opt[++i]=tem.slice();
         i++;
    
    }
    //sendOUT({out1:opt});
//var childProcess = require('child_process');
shared.now_state = true;


var c = new ColorCycle();
c.init(opt);
setInterval(function(){
c.color_cycle();},50);       
//  shared.n = childProcess.fork('./breath.js',{cwd: __dirname});
//  shared.send(hub_shared.ledstrip);         

// var lib = require("jsupm_apa102");
// var ledstrip = new lib.APA102(96,0);   
 //setInterval(breath,50);

}
else if (IN.in1 !== 'circle')
{  
    if(shared.now_state===true)
    {
          //shared.n.kill();
        shared.now_state=false;
    }
}