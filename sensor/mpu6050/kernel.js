
//#define Kp 100.0f    比例增益支配率收敛到加速度计/磁强计
var Kp = 100;
//#define Ki 0.002f    积分增益支配率的陀螺仪偏见的衔接
var Ki = 0.002;

var T = 0.02; 

var sensorObj = require('jsupm_mpu9150');
// Instantiate an MPU9105 on default I2C bus and address
var sensor = new sensorObj.MPU9250(0,0x68,0x0c,false);
// Initialize the device with default values
sensor.init();
//sensor.setGyroscopeScale(0);

var x = new sensorObj.new_floatp();
var y = new sensorObj.new_floatp();
var z = new sensorObj.new_floatp();


var Roll,Pitch,Yaw;


 
 

function IMUupdate(ax, ay, az, gx,gy, gz)
{
  
     var data = {
    "pitch":Pitch,
    "yaw":Yaw,
    "roll":Roll
};
     //console.log(Pitch,Roll,Yaw);

     shared.sendNumber(JSON.stringify(data));
}


setInterval(function()
{
    sensor.update();

    sensor.getAccelerometer(x, y, z);
    ax= sensorObj.floatp_value(x);
    ay= sensorObj.floatp_value(y);
    az= sensorObj.floatp_value(z);

    sensor.getGyroscope(x, y, z);
    gx= sensorObj.floatp_value(x);
    gy= sensorObj.floatp_value(y);
    gz= sensorObj.floatp_value(z);
    
    
}, 20);