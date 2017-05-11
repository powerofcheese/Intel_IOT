var lib = require('jsupm_apa102');
var ledStrip = new lib.APA102(96,0,true);
var colornow;
var tem = [];
var color_arr = new Array(96);

function gradation(color){
    var color_data = color.split(" ");
    var interval = (96-color_data.length)/color_data.length;
    var l =95;
    for(var j = 0;j<color_data.length;j++)
    {
        colornow ='#'+ arr[j].slice(3);
        tem[j] = colorRgb(colornow);
    }

    for(var i = color_data.length-1;i>0;i--)
    {
        var r = parseInt((tem[i][0]-tem[i-1][0])/interval);
        var g = parseInt((tem[i][1]-tem[i-1][1])/interval);
        var b = parseInt((tem[i][2]-tem[i-1][2])/interval);
	color_arr[l]=tem[i].slice();
        for(var k = 0;k<interval;k++){
	  l--;
          color_arr[l][0]=tem[i][0]-r;
	  color_arr[l][1]=tem[i][1]-g;
	  color_arr[l][0]=tem[i][2]-b;
	}
    }
	var r = parseInt((tem[0][0]-tem[color_data.length-1][0])/interval);
        var g = parseInt((tem[0][1]-tem[color_data.length-1][1])/interval);
        var b = parseInt((tem[0][2]-tem[color_data.length-1][2])/interval);
	color_arr[l]=tem[0].slice();
        for(var k = 0;k<interval;k++){
	  l--;
          color_arr[l][0]=tem[0][0]-r;
	  color_arr[l][1]=tem[0][1]-g;
	  color_arr[l][2]=tem[0][2]-b;
	}   
}

string color ="#ff00ff22 #ff123456 #ff231442 #ff884488 #ff334466 #ff776644";
gradation(color);   