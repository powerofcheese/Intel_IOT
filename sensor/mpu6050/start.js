done();

var sensorObj = require('jsupm_mpu9150');
// Instantiate an MPU9105 on default I2C bus and address
var sensor = new sensorObj.MPU9250(0,0x68,0x0c,false);
// Initialize the device with default values
sensor.init();
// sensor.setGyroscopeScale(0);

var x = new sensorObj.new_floatp();
var y = new sensorObj.new_floatp();
var z = new sensorObj.new_floatp();

var Roll,Pitch,Yaw;
var angleAx,gyroGy;
var angle1 = 0 ; 
var angle2 = 0;
//一阶互补滤波

var K1 =0.1; // 对加速度计取值的权重

var dt=0.02;//注意：dt的取值为滤波器采样时间


function yijiehubu_P(angle_m, gyro_m)//采集后计算的角度和角加速度

{

     angle1 = K1 * angle_m + (1-K1) * (angle1 + gyro_m * dt);

         return angle1;

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
    
    angleAx=atan2(ax,az)*180/PI;//计算与x轴夹角
    gyroGy=-gy/131.00;//计算角速度
    pitch = Yijielvbo(angleAx,gyroGy);//一阶滤波
    

}, 50);