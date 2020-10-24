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
  modelName: 'User',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

class Message extends Model {}
Message.init({
  user_id: { type: DataTypes.BIGINT, allowNull: false },
  room: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false }
}, {
  sequelize,
  modelName: 'Message',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

async function fetchUser(token) {
    return User.findOne({ attributes: ['id', 'username'], where: { token: token } });
}

async function storeMessage(user_id, room, message) {
    return Message.create({
        user_id: user_id,
        room: room,
        message: message
    }, { fields: ['user_id', 'room', 'message'] });
}

// Register a middleware to authenticate before joining any room
io.use(async (socket, next) => {
  const user = await fetchUser(socket.handshake.query.token);
  let room = socket.handshake.query.room;
  if (room === 'public-room' || room.split('-').includes(user.id.toString())) {
    // we store username & room in the socket session for this client
    socket.user = user;
    socket.room = room;
    return next();
  }
  return next(new Error('authentication error'));
});

let users = new Set();

io.on('connection', (socket) => {
  console.log(`Add ${socket.user.username} to room: ${socket.room}`);
  socket.join(socket.room);

  users.add(socket.user.username);

  // send a list of online users to the client
  socket.emit('login', {
    users: [...users.values()]
  });

  // echo globally (all clients) that a person has connected
  socket.broadcast.emit('user joined', {
    username: socket.user.username,
    users: [...users.values()]
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', async (data) => {
    // store message in database
    await storeMessage(socket.user.id, socket.room, data);

    // we tell the client to execute 'new message'
    socket.to(socket.room).emit('new message', {
      username: socket.user.username,
      message: data
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.to(socket.room).emit('typing', {
      username: socket.user.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.to(socket.room).emit('stop typing', {
      username: socket.user.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    users.delete(socket.user.username);

    // echo globally that this client has left
    socket.broadcast.emit('user left', {
      username: socket.user.username,
      users: [...users.values()]
    });
  });
});
