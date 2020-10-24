require('dotenv').config();

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.SOCKET_IO_PORT || 3000;

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(`${process.env.DB_CONNECTION}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

class User extends Model {}
User.init({
  username: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  modelName: 'User'
});

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

async function fetchUser(token) {
    return User.findOne({ attributes: ['id', 'username'], where: { token: token } });
}

// Register a middleware to authenticate before joining any room
io.use(async (socket, next) => {
  const user = await fetchUser(socket.handshake.query.token);
  let room = socket.handshake.query.room;
  if (room === 'public-room' || room.split('-').includes(user.id.toString())) {
    // we store username & room in the socket session for this client
    socket.username = user.username;
    socket.room = room;
    return next();
  }
  return next(new Error('authentication error'));
});

let users = new Set();

io.on('connection', (socket) => {
  console.log(`Add ${socket.username} to room: ${socket.room}`);
  socket.join(socket.room);

  users.add(socket.username);

  // send a list of online users to the client
  socket.emit('login', {
    users: [...users.values()]
  });

  // echo globally (all clients) that a person has connected
  socket.broadcast.emit('user joined', {
    username: socket.username,
    users: [...users.values()]
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.to(socket.room).emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.to(socket.room).emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.to(socket.room).emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    users.delete(socket.username);

    // echo globally that this client has left
    socket.broadcast.emit('user left', {
      username: socket.username,
      users: [...users.values()]
    });
  });
});
