//\ server side
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// \Serves the index.html to the server
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// \Prints out in the terminal when a user connects/diconnects
io.on('connection', function(socket){
  console.log(socket.id + ' connected');
  io.emit('chat message', socket.id + " joined the room");
  socket.on('disconnect', function(){
    console.log(socket.id + ' disconnected');
    io.emit('chat message', socket.id + " left the room");
  });
});

// \Prints out a msg in the terminal and broadcasts it to connected users
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + socket.id + " : " + msg);
    io.emit('chat message', socket.id + " : " + msg);
  });
});

// \ Sets the port of the server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
