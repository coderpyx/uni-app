module.exports = function (io) {
	var socketList = {};  // 当前群聊列表， 键为 自己取的名字， 值为连接时的socket.id
	var users = [];   // 群聊人员列表
	let member = 0
 
	io.sockets.on('connection', function (socket) {
		socket.on('join', (name, img) => {
			socket.name = name;
			socketList[name] = socket.id;
			member ++;
			// let user = { name, img, id: socket.id, tip: false };
			// users.push(user);

			// socket.broadcast.emit('welcome', name, users);  //  除自己外。广播有人加入群聊
			// socket.emit('myself', name, users, socket.id);   // 给自己发送广播
			socket.broadcast.emit('welcome', name, member);  //  除自己外。广播有人加入群聊
			socket.emit('myself', name, member);   // 给自己发送广播
		});
		//接收信息广播
		socket.on('message', data => {
			//广播
			socket.broadcast.emit('sendMsg', data);
		})
		//一对一消息
		socket.on('msg', data => {
			//console.log(data.tid);
			//广播
			socket.to(data.tid).emit('sMsg', data);
		})

		//用户离开
		socket.on('disconnecting', function () {
			if (socketList.hasOwnProperty(socket.name)) {
				//删除
				delete socketList[socket.name];
				for (var i = 0; i < users.length; i++) {
					if (users[i].name == socket.name) {
						users.splice(i, 1);
					}
				}
				//广播有用户退出
				socket.broadcast.emit('quit', socket.name, users);
			}
		})
	})
}