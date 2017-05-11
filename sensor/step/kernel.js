/**
 * Created by Administrator on 2016//21.
 */
//  sendOUT({
//      step:"ss"
//  })



    
var childProcess = require('child_process');
var n = childProcess.fork('./stepcount.js',{cwd: __dirname});


n.on('message', function(m) {
    
     var data = m.toString();
     if (data==="Stomp_true")
     {
         sendOUT({
             Stomp:true
         });
     }
     else if (data ==="toe_true")
     {
         sendOUT({
             Toe:true
         });
     }
     else if (data==="heel_true")
     {
         sendOUT({
             Heel:true
         });
     }
     
     
    // if(data==="Stomp_true"||data==="toe_true"||data==="heel_true")
    //     {
             
    //  if(hub_shared.gestureStateList.length!==0){


        
    //          for(var i =0; i<hub_shared.gestureStateList.length;i++)
    //          {
                   
    //             if (hub_shared.gestureStateList[i].isStomp===true&&data==="Stomp_true"){
    //                 sendOUT({
    //                     color:JSON.stringify(hub_shared.gestureStateList[i].motion),
    //                     inf:"interface"
    //                 });
    //                 break;
    //             }
    //             else if (hub_shared.gestureStateList[i].isToe===true&&data==="toe_true"){
    //                 sendOUT({
    //                     color:JSON.stringify(hub_shared.gestureStateList[i].motion),
    //                     inf:"interface"
    //                 });
    //                 break;
    //             }
    //             else if (hub_shared.gestureStateList[i].isHeel===true&&data==="heel_true"){
    //                 sendOUT({
    //                     color:JSON.stringify(hub_shared.gestureStateList[i].motion),
    //                     inf:"interface"
    //                 });
    //                 break;
                    
    //             }
                
    //          }
             
    //      }
 //    }
//       else{
//   // cosole.log(data);
   
//   hub_shared.step=data;
//       sendOUT({   
//           step:data     
//       });
       
//      }
});
