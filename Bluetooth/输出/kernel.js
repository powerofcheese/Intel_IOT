



var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
var colorRgb = function(color){  
    var sColor = color.toLowerCase();  
    if(sColor && reg.test(sColor)){  
        if(sColor.length === 4){  
            var sColorNew = "#";  
            for(var i=1; i<4; i+=1){  
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
            }  
            sColor = sColorNew;  
        }  
        //处理六位的颜色值
        var sColorChange = [];  
        for(var i=1; i<7; i+=2){  
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        }  
        return sColorChange; 
    }else{  
        return sColor;    
    }  
};  
function func(str){
    return str.replace(/[\r\n]/g, '');
}

  shared.bluetooth.stdout.on('data', function (data) {
     var R_data = func(data.toString());
     
     var arr = R_data.split(" ");
     if(arr[0]==='custom'){
     var colornow ='#'+ arr[1].slice(3);
     var arr1 = arr[2];
     var nowcolor = colorRgb(colornow);
     sendOUT({r:nowcolor[0],
              g:nowcolor[1],
              number:arr1,
              b:nowcolor[2],
              state:'custom'
              })
     }
     else if(arr[0]==='music'){
        shared.followMusic(arr[1]);
     } 
     else if(arr[0]=== 'step'){
          sendOUT({
              state:'step'
          }); 
          shared.bluetooth.stdin.write(hub_shared.step+'\n');
     }
     else {
        var mode = JSON.parse(data.toString());
        var nomelState= JSON.stringify(mode.state.normalState.motion);
        var r_data=mode.modeName;
        
      hub_shared.gestureStateList= mode.state.gestureStateList;
       
       
      switch(r_data){
         
            case 'ball':
                sendOUT({
                     state:'ball'
                 });
                 break;
        
     
            case 'eye':
                sendOUT({
                    state:'eye'
                });
                break;
     
     
            case 'star':
                    sendOUT({
                    state:'star'
                    }); 
                
                break;
     
   
            case 'wave':
                sendOUT({
                    state:'wave'
                });   
                break;
         
            case 'charse':
                sendOUT({
                    state:'chaser'
                });
                break;
     
            case 'fire':
     
                sendOUT({
                    state:'fire'
                });
                break;
    
            case 'go':
     
                 sendOUT({
                    state:'go'
                });
                break;
     
            default:
                 sendOUT({
                    state:'interface',
                     out1:JSON.stringify(mode.state.normalState.motion)
                     
                     
                })
                break;
        
          }

      }
});
    
     

 
 
shared.bluetooth.on("exit", function(code) {
  console.log("byebye");
});



