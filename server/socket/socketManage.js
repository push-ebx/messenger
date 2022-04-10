const events = require('./events')
const jwt = require("jsonwebtoken");
require('dotenv').config({path: "../.env"});

const users_online = [];

module.exports = io => socket => {
  console.log(socket.id, "is connected")
  socket.on(events.MESSAGE_SEND, message => {
    console.log(message)
    io.emit(events.MESSAGE_GET, message)
  });
  // socket.on(events.IS_ONLINE, user => {
  //   console.log(user?.token)
  //   if (!user?.token) return;
  //   io.emit(events.IS_ONLINE, {id:jwt.verify(user.token, process.env.SECRET).id})
  // });
}