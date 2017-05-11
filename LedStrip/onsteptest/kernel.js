 var lib = require('jsupm_apa102');
 var IsOnStep=false;
 
 var LedStrip = new lib.APA102(96,0);
LedStrip.setLeds(0,95,1,255,255,255);
//LedStrip.pushState();

// function FadeINQuickOUT(i,end,lightness){
//     // lightness+=1;
//     // if(lightness===30){
//     //     lightness=0;
//     //     return;
//     // }
    
//     // LedStrip.setLedsBrightness(0,95,lightness);
//     // LedStrip.pushState();
// 	if (i<end) { 
// 	    lightness+=1;
// 	    LedStrip.setLedsBrightness(0,95,lightness);
// 	    LedStrip.pushState();
// 	//	setTimeout(FadeINQuickOUT,200,++i,end,lightness);
// 	} else {
// 	   // LedStrip.setLedsBrightness(0,95,0);
// 	   // LedStrip.pushState();
// 	    return;
// 		} 

    
    
// }
//FadeINQuickOUT(0,30,0);
