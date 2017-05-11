var sensorObj = require('jsupm_lsm9ds0');

// Instantiate an LSM9DS0 using default parameters (bus 1, gyro addr 6b,
// xm addr 1d)
var sensor = new sensorObj.LSM9DS0();

// Initialize the device with default values
sensor.init();

var x = new sensorObj.new_floatp();
var y = new sensorObj.new_floatp();
var z = new sensorObj.new_floatp();

var Kp = 2; // proportional gain governs rate of convergence to accelerometer/magnetometer
var Ki = 0.005; // integral gain governs rate of convergence of gyroscope biases
var halfT = 0.25; // half the sample period

var q0 = 1, q1 = 0, q2 = 0, q3 = 0; // quaternion elements representing the estimated orientation
var exInt = 0, eyInt = 0, ezInt = 0; // scaled integral error

var Pitch,Roll,Yaw;

function AHRSupdate(gx, gy, gz, ax, ay, az,  mx, my, mz) {
var norm;
var hx, hy, hz, bx, bz;
var vx, vy, vz, wx, wy, wz;
var ex, ey, ez;

// auxiliary variables to reduce number of repeated operations
var q0q0 = q0*q0;
var q0q1 = q0*q1;
var q0q2 = q0*q2;
var q0q3 = q0*q3;
var q1q1 = q1*q1;
var q1q2 = q1*q2;
var q1q3 = q1*q3;
var q2q2 = q2*q2;   
var q2q3 = q2*q3;
var q3q3 = q3*q3;          
// normalise the measurements
norm =Math.sqrt(ax*ax + ay*ay + az*az);       
ax = ax / norm;
ay = ay / norm;
az = az / norm;
norm = Math.sqrt(mx*mx + my*my + mz*mz);          
mx = mx / norm;
my = my / norm;
mz = mz / norm;         
// compute reference direction of flux  转换到地理坐标系中去确定北向和地向的分量
hx = 2*mx*(0.5 - q2q2 - q3q3) + 2*my*(q1q2 - q0q3) + 2*mz*(q1q3 + q0q2);
hy = 2*mx*(q1q2 + q0q3) + 2*my*(0.5 - q1q1 - q3q3) + 2*mz*(q2q3 - q0q1);
hz = 2*mx*(q1q3 - q0q2) + 2*my*(q2q3 + q0q1) + 2*mz*(0.5 - q1q1 - q2q2);         
bx = Math.sqrt((hx*hx) + (hy*hy));   //东向将其变换成为了0，但是膜没有变
bz = hz;        
// estimated direction of gravity and flux (v and w)
vx = 2*(q1q3 - q0q2);
vy = 2*(q0q1 + q2q3);
vz = q0q0 - q1q1 - q2q2 + q3q3;     //重力转换到机体坐标系中去和测量值作对比
wx = 2*bx*(0.5 - q2q2 - q3q3) + 2*bz*(q1q3 - q0q2);
wy = 2*bx*(q1q2 - q0q3) + 2*bz*(q0q1 + q2q3);
wz = 2*bx*(q0q2 + q1q3) + 2*bz*(0.5 - q1q1 - q2q2);    //磁转换到机体坐标系中去和测量值作对比
// error is sum of cross product between reference direction of fields and direction measured by sensors
ex = (ay*vz - az*vy) + (my*wz - mz*wy);        //综合磁和加速度的误差  叉乘看到没有
ey = (az*vx - ax*vz) + (mz*wx - mx*wz);
ez = (ax*vy - ay*vx) + (mx*wy - my*wx);
// integral error scaled integral gain
exInt = exInt + ex*Ki;
eyInt = eyInt + ey*Ki;
ezInt = ezInt + ez*Ki;
// adjusted gyroscope measurements
gx = gx + Kp*ex + exInt;
gy = gy + Kp*ey + eyInt;
gz = gz + Kp*ez + ezInt;
// integrate quaternion rate and normalise 
q0 = q0 + (-q1*gx - q2*gy - q3*gz)*halfT;
q1 = q1 + (q0*gx + q2*gz - q3*gy)*halfT;
q2 = q2 + (q0*gy - q1*gz + q3*gx)*halfT;
q3 = q3 + (q0*gz + q1*gy - q2*gx)*halfT;  
// normalise quaternion
norm = Math.sqrt(q0*q0 + q1*q1 + q2*q2 + q3*q3);
q0 = q0 / norm;
q1 = q1 / norm;
q2 = q2 / norm;
q3 = q3 / norm;

Pitch  = Math.asin(-2 * q1 * q3 + 2 * q0* q2)* 57.3;  // pitch

Roll = Math.atan2(2 * q2 * q3 + 2 * q0 * q1, -2 * q1 * q1 - 2 * q2* q2 + 1)* 57.3; // roll

Yaw = -Math.atan2(2 * q1 * q2 + 2 * q0 * q3, -2 * q2*q2 - 2 * q3 * q3 + 1)* 57.3; // yaw
     var data = {
        'pitch':Pitch,
        'roll':Roll,
        'yaw':Yaw
    };

shared.sendNumber(JSON.stringify(data));    
//console.log(Pitch,Roll,Yaw);
}

// Output data every half second until interrupted
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

    sensor.getMagnetometer(x, y, z);
    mx= sensorObj.floatp_value(x);
    my= sensorObj.floatp_value(y);
    mz= sensorObj.floatp_value(z);

    AHRSupdate(gx, gy, gz, ax, ay, az,  mx, my, mz);

}, 500);

// exit on ^C
process.on('SIGINT', function()
{
    sensor = null;
    sensorObj.cleanUp();
    sensorObj = null;
    console.log("Exiting.");
    process.exit(0);
});      