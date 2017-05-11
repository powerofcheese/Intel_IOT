  var sensorObj = require('jsupm_mpu9150');
// Instantiate an MPU9105 on default I2C bus and address
    var sensor = new sensorObj.MPU9250(0,0x68,0x0c,false);
    
// Initialize the device with default values
    sensor.init();
    sensor.setGyroscopeScale(0);

    var x = new sensorObj.new_floatp();
    var y = new sensorObj.new_floatp();
    var z = new sensorObj.new_floatp();
    
    
setInterval(function()
{
    sensor.update();

    sensor.getAccelerometer(x, y, z);
    ax= sensorObj.floatp_value(x);
    ay= sensorObj.floatp_value(y);
    az= sensorObj.floatp_value(z);
   console.log(ax+"  "+ay+"  "+az);
    // sendOUT({out1:ax+' '+ay+' '+az+' '});
            
  
    
       
}, 20);    