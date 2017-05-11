/**
 * Created by sincerty on 16-9-6.
 */

var http = require('http');
var util=require('util');

var data={
    step:IN.step,
    color:IN.color,
    scenes:IN.scenes
}
//json转换为字符串

var content = JSON.stringify(data);
//console.log(content);
var options = {
    host: 'www.powerofcheese.cn',
    port:80,
    path:'/demo.php',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': content.length
    }
};

var req = http.request(options, function(res) {
   console.log(res.statusCode);
if(res.statusCode===200){
    console.log(res.headers);
    res.setEncoding('utf8');
    var body ='';
    res.on('data', function (chunk) {
       console.log(chunk);
    });
}
    res.on('end',function(){
        console.log("No more data in response");
    });
});
req.write(content);
req.end();         
