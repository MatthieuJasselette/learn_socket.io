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
  console.log('an user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// \Prints out a msg in the terminal and broadcasts it to connected users
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// \ Sets the port of the server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
