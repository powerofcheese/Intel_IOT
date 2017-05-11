
var Kp = 100;
// //#define Ki 0.002f    积分增益支配率的陀螺仪偏见的衔接
var Ki = 0.002;

var  halfT = 0.001;

var sensorObj = require('jsupm_mpu9150');
// Instantiate an MPU9105 on default I2C bus and address
var sensor = new sensorObj.MPU9250(0,0x68,0x0c,false);
// Initialize the device with default values
sensor.init();
sensor.setGyroscopeScale(0);

var x = new sensorObj.new_floatp();
var y = new sensorObj.new_floatp();
var z = new sensorObj.new_floatp();


var q0 = 1;
var q1 = 0;
var q2 = 0;
var q3 = 0;

var Roll,Pitch,Yaw;

// var GyroMeasDrift = Math.PI * (2 / 180);     
// var zeta = Math.sqrt(3 / 4) * GyroMeasDrift; 
// var GyroMeasError = Math.PI * (40 / 180); 
// var beta = Math.sqrt(3 / 4) * GyroMeasError;
// var deltat = 0.002;

// var gbiasx = 0 ;
// var gbiasy = 0 ;
// var gbiasz = 0 ;        // gyro bias error

 var exInt = 0 ;
 var eyInt = 0 ;
 var ezInt = 0 ;

function IMUupdate(ax, ay, az, gx,gy, gz)
{
    //console.log(ax,ay,az);
    var norm,norm1;
    var  vx, vy, vz;
    var ex, ey, ez;
   
    
    //首先将加速度的值归一化
    
    norm = Math.sqrt(ax * ax + ay * ay + az * az);
    if(norm === 0){
        return;
    }
    ax = ax / norm;
    ay = ay / norm;
    az = az / norm;

    //提取四元数的等效余弦矩阵中的重力分量
    vx = 2*(q1*q3 - q0*q2);
    vy = 2*(q0*q1 + q2*q3);
    vz = q0*q0 - q1*q1 - q2*q2 + q3*q3;
 
    //用叉积误差来做PI修正陀螺零偏,exyz就是两个重力向量的叉积。
    ex = (ay*vz - az*vy);
    ey = (az*vx - ax*vz);
    ez = (ax*vy - ay*vx);
    

    //ex 是 ax 和 vx 的叉积
    exInt = exInt + ex*Ki;
    eyInt = eyInt + ey*Ki;
    ezInt = ezInt + ez*Ki;
    
    
    //adjusted gyroscope measurements
    gx = gx + Kp*ex + exInt;
    gy = gy + Kp*ey + eyInt;
    gz = gz + Kp*ez + ezInt;

   
    //其中T为测量周期,gx、gy、gz都是角速度
    //更新四元数
    q0 = q0 + (-q1*gx - q2*gy - q3*gz)*halfT;
    q1 = q1 + (q0*gx + q2*gz - q3*gy)*halfT;
    q2 = q2 + (q0*gy - q1*gz + q3*gx)*halfT;
    q3 = q3 + (q0*gz + q1*gy - q2*gx)*halfT;

    //四元数归一化
    norm1=Math.sqrt(q0*q0+q1*q1+q2*q2+q3*q3);
    q0=q0/norm1;
    q1=q1/norm1;
    q2=q2/norm1;
    q3=q3/norm1;

    //得到欧拉角
    
    //Pitch= Math.asin(-2 * q1 * q3 + 2 * q0* q2);//俯仰角
    //Roll= Math.atan2(2 * q2 * q3 + 2 * q0 * q1, -2 * q1 * q1 - 2 * q2* q2 + 1);//翻滚角
    Yaw = Math.atan2(2 * q1 * q2 + 2 * q0 * q3, -2 * q2*q2 - 2 * q3* q3 + 1);//航向角
    
    console.log(Pitch,Roll,Yaw);
//     var data = {
//     "pitch":Pitch,
//     "yaw":Yaw,
//     "roll":Roll
// };
//      //console.log(Pitch,Roll,Yaw);

//      shared.sendNumber(JSON.stringify(data));
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
    
    IMUupdate(ax,ay,az,gx*Math.PI/180,gy*Math.PI/180,gz*Math.PI/180);
    

}, 20);