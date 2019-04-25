function () {
  const socket = io();
  document.querySelector('form').submit(function(e){
    e.preventDefault();
    socket.emit('chat message', document.getElementById('m').value());
    document.getElementById('m').value('');
    return false;
  });
  socket.on('chat message', function(msg){
    console.log("message received");
    var message = document.createElement("li")
    message.innerText = msg
    document.getElementById('message').appendChild(message)
  });
}
