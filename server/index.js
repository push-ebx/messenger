const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const router = require('./router/router');
const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

app
    .use(cors())
    .use(express.json())
    .use('/api', router);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const socketManage = require('./socket/socketManage')(io);
io.on('connection', socketManage);

(async () => {
  try {
    await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
    server.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();