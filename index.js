var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];
var user = 0;

io.sockets.on('connection', function(socket) {
	console.log("Connect " + users[0] + ' ' + users[1] + ' ' + users[2]);
	connections.push(socket);
	user += 1;
	io.sockets.emit('user', user);

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Disconnect");
	});

	socket.on('send', function(data) {
		io.sockets.emit('add', data);
	});
});