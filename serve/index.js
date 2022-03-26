
const express = require("express");
const app = express();

var server = app.listen(4000)
var io = require('socket.io').listen(server);
//引入socket.js
require('./model/socket.js')(io);

// app.listen(4000, () => { console.log("server running on 4000") });