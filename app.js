var app = require('express').createServer(),
    io  = require('socket.io').listen(app);

app.listen(port = process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

count = 0;

io.sockets.on('connection', function (socket) {
  function update() {
    io.sockets.emit('update', { users: count });
  }

  count++;
  update();

  socket.on('disconnect', function () {
    count--;
    update();
  });
});