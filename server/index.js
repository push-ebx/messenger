const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const router = require('./router/router');

const DB_URL = ``;
const PORT = 5000;

app
    .use(cors())
    .use(express.json())
    .use('/api', router);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

(async () => {
  try {
    await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
    server.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (e) {
    console.log(e)
  }
})();