
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http); 
io.on("connection", socket => {
	console.log(socket.id);
	// 客户端链接成功    
	// 1. 进来要连接成功（对应前端建立连接）   
	 console.log('socket 连接成功！');    
	// 2. 接收到前端发过来的消息（对应前端发送消息）    
	socket.on('message', function (data) {
		console.log(data)
		// 3. 接收到消息，就可以广播出去（对应前端接收消息）   
		socket.broadcast.emit('sendMsg', data);
	})
});

http.listen(4000, () => { console.log("server running on 4000") });