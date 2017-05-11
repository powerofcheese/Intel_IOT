var lib = require('jsupm_apa102');
var ledStrip = new lib.APA102(96,0,true);

var colors = [ {r:255, g:255, b:0},
			   {r:255, g:0, b:0},
			   {r:0, g:0, b:255},
			   {r:0, g:255, b:0},
			   {r:255, g:0, b:255} ];

function go (i, end, idx) {
	if (i<end) {
		
		// Clear previous LED
		if(i !== 0) {
			ledStrip.setLed(i-1,1,0,0,0);
		}

		// Set LED to color
		ledStrip.setLed(i,20,colors[idx].r,colors[idx].g,colors[idx].b);

		ledStrip.pushState();
		setTimeout(go,50,++i,end,idx);
	} else {
		// Set all LEDs to black
		ledStrip.setAllLeds(31,0,0,0);
		go( 0, 96, (idx+1)%colors.length );
	} 
}

go(0,96,0);  