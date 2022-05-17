const events = require('../../client/src/events')
const jwt = require("jsonwebtoken");
require('dotenv').config({path: "../.env"});

let users_online = [];

module.exports = io => socket => {
  console.log(socket.id, "is connected")
  socket.on(events.MESSAGE_SEND, message => {
    console.log(message)
    // io.emit(events.MESSAGE_GET, message)
    // socket.clients()
    socket.to(+message.receiver_id).emit(events.MESSAGE_GET, message)
  });

  socket.on(events.NEW_USER, user => {
    users_online.push({[socket.id]: user})
    socket.join(user.id)
    // users_online.map(user, )
    console.log(users_online)
  })

  socket.on("disconnect", user => {
    users_online = users_online.filter(user => !user.hasOwnProperty(socket.id))
    console.log(users_online)
  })

  // or pass token?
  // socket.on(events.IS_ONLINE, user => {
  //   console.log(user?.token)
  //   if (!user?.token) return;
  //   io.emit(events.IS_ONLINE, {id:jwt.verify(user.token, process.env.SECRET).id})
  // });
}