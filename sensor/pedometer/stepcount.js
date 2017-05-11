/**
 * Created by Administrator on 2016/8/21.
 */


    //var oriValues = new Array(3);
    var valueNum = 4;
    
    var tempValue = new Array(valueNum);
    
    var tempCount = 0;
    
    var isDirectionUp = false;
    
    var continueUpCount = 0;
    
    var continueUpFormerCount = 0;
    
    var lastStatus = false;
    
    var peakOfWave = 0;
    
    var valleyOfWave = 0;
    
    var timeOfThisPeak = 0;
    
    var timeOfLastPeak = 0;
    
    var timeOfNow = 0;
    
    var gravityNew = 0;
    
    var gravityOld = 0;
    var initialValue = 1.2;
    
    var ThreadValue = 1.5;
    var CountTimeState = 0;
    
    var CURRENT_SETP = 0;
    var TEMP_STEP = 0;
    var lastStep = -1;

    var gravity = new Array(3);
    var pitch=0;
    var roll =0;       
    var isToe = 0;
    var isHeel = 0;
    var isStomp = 0;
    var average = 0;
    var now_step = 0;
    var Kp = 2;
var Ki = 0.005;//0.008f
var deltat = 0.05;
var K1 =0.5; // 对加速度计取值的权重
var dt = 0.05;//注意：dt的取值为滤波器采样时间

var angle_P = 0;
var angle_R = 0;
var angle_Y = 0;
var angleAx_P,angleAx_R,gyroGy_P,gyroGy_R;




    //var duration = 4000;
    
    var sensorObj = require('jsupm_mpu9150');
    
// // Instantiate an MPU9105 on default I2C bus and address
//     var sensor = new sensorObj.MPU9250(0,0x68,0x0c,false);
   // var sensorObj = require('jsupm_lsm9ds0');
var sensor = new sensorObj.MPU60X0();
// Instantiate an LSM9DS0 using default paameters (bus 1, gyro addr 6b,
// xm addr 1d)
//var sensor = new sensorObj.LSM9DS0();
// Initialize the device with default values
    sensor.init();
    sensor.setGyroscopeScale(0);

    var x = new sensorObj.new_floatp();
    var y = new sensorObj.new_floatp();
    var z = new sensorObj.new_floatp();


  function onSensorChanged(x,y,z) {

    gravityNew = Math.sqrt(x * x+y * y + z * z);
  
    DetectorNewStep(gravityNew);
}


    function DetectorNewStep(values) {
      if (gravityOld === 0) {
         gravityOld = values;
      } else {
          if (DetectorPeak(values, gravityOld)) {
              timeOfLastPeak = timeOfThisPeak;
              timeOfNow = (new Date()).valueOf();
             
             //console.log(timeOfNow - timeOfLastPeak);
              //console.log(peakOfWave - valleyOfWave);
              if (timeOfNow - timeOfLastPeak >= 100
                && (peakOfWave - valleyOfWave >= ThreadValue) && timeOfNow - timeOfLastPeak <= 400) 
                {
                          if(isStomp===0){
                            isStomp=1;
                             }
                          else if(isStomp===1)
                            {
                            isStomp=0;
                           
                            process.send("Stomp_true");

                            }         
                }
              if (timeOfNow - timeOfLastPeak >= 400
                && (peakOfWave - valleyOfWave >= ThreadValue) && timeOfNow - timeOfLastPeak <= 2000) {
                 timeOfThisPeak = timeOfNow;
                //  console.log("Onstep");
                 // process.send("Onstep");
                   preStep();
        }
       
         if (timeOfNow - timeOfLastPeak >= 200
            && (peakOfWave - valleyOfWave >= initialValue)) {
               timeOfThisPeak = timeOfNow;
               ThreadValue = Peak_Valley_Thread(peakOfWave - valleyOfWave);
        }
    }
}
         gravityOld = values;
}

function preStep() {
    if (CountTimeState === 0) {
        
        //time = new TimeCount(duration, 700);
        //time.start();
       // console.log("555");
        CountTimeState = 1;
       
    } else if (CountTimeState == 1) {
      //console.log(pitch);    
         if(pitch>=1.1&&pitch<=1.9)    
        {
            if(isToe===0){
                isToe=1;
            }
            else if(isToe===1)
            {
                isToe=0;
            //console.log('toe_true');
         process.send("toe_true");
            
            }
            // process.send("toe_true");
            
        }
        else if(pitch<=-0.82&&pitch>=-1.4){
            
            if(isHeel===0){
                isHeel=1;
            }
            else if(isHeel===1)
            {
                isHeel=0;
                
                process.send("heel_true");
              //  console.log('heel_true');        
            }
            
        
        }
        TEMP_STEP++;
        now_step = TEMP_STEP;
      process.send(now_step);
       
      // console.log(TEMP_STEP);
  
        
    } else if (CountTimeState == 3) {
        CURRENT_SETP++;
    }
}


function DetectorPeak(newValue, oldValue) {
    
    lastStatus = isDirectionUp;
    if (newValue >= oldValue) {
        isDirectionUp = true;
        //console.log("notOnStep")
        continueUpCount++;
    } else {

        continueUpFormerCount = continueUpCount;
        continueUpCount = 0;
        
        isDirectionUp = false;
    }

    if (!isDirectionUp && lastStatus
        && (continueUpFormerCount >= 2 && (oldValue >= 1))) {
        peakOfWave = oldValue;
        return true;
    } else if (!lastStatus && isDirectionUp) {
        valleyOfWave = oldValue;
        return false;
    } else {
        return false;
    }
}



function Peak_Valley_Thread(value) {
    var tempThread = ThreadValue;
    if (tempCount < valueNum) {
        tempValue[tempCount] = value;
        tempCount++;
    } else {
        tempThread = averageValue(valueNum);
        for (var i = 1; i < valueNum; i++) {
            tempValue[i - 1] = tempValue[i];
        }
        tempValue[valueNum - 1] = value;
    }
    return tempThread;
}


function averageValue( n) {
    var ave = 0;
    for (var i = 0; i < n; i++) {
        ave += tempValue[i];
    }
    ave = ave / valueNum;
    if (ave >= 8)
        ave = 4.3;
else if (ave >= 7 && ave < 8)
        ave =  3.3;
else if (ave >= 4 && ave < 7)
        ave =  2.3;
else if (ave >= 3 && ave < 4)
        ave =  2.0;
else {
        ave =  1.3;
    }
    return ave;
}

setInterval(function()
{
    sensor.update();
var ax,ay,az,gx,gy,gz,mx,my,mz;
    sensor.getAccelerometer(x, y, z);
    ax= sensorObj.floatp_value(x);
    ay= sensorObj.floatp_value(y);
    az= sensorObj.floatp_value(z);
     

    sensor.getGyroscope(x, y, z);
    gx= sensorObj.floatp_value(x);
    gy= sensorObj.floatp_value(y);
    gz= sensorObj.floatp_value(z);
   //var pitch = 0;
       angleAx_P = -Math.atan2(ax,az)*180/Math.PI;//加速度计算角度
    gyroGy_P = gy;//陀螺仪角速度，注意正负号与放置有关
    angle_P = K1 * angleAx_P+ (1-K1) * (angle_P + gyroGy_P * dt);
     pitch = (angle_P+5)*Math.PI/180;
     
    angleAx_R = Math.atan2(ay,az)*180/Math.PI;//加速度计算角度
    gyroGy_R = gx;//陀螺仪角速度，注意正负号与放置有关
    angle_R = K1 * angleAx_R+ (1-K1) * (angle_R + gyroGy_R * dt);
     roll = angle_R*Math.PI/180 ;   
     //console.log(pitch);
     
    onSensorChanged(ax,ay,az);
            
  
    
       
}, 20);


