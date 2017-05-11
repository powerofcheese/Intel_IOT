var ws = require("nodejs-websocket");
console.log("开始建立连接...");

//var game1 = null,game2 = null , game1Ready = false , game2Ready = false;
shared.server = ws.createServer(function(conn){
   
  conn.on("text", function () {
    //console.log("sss");
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
  

    
}).listen(8002);
shared.sendNumber=function (x) {
        
           // var number =Math.random();
            shared.server.connections.forEach(function (connection) {
                connection.sendText(x);});
            //setTimeout(sendNumber, 100);
           // console.log(numb);
}
done();        