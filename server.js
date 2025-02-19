const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { // Enable CORS (important for local development)
        origin: "http://localhost:5500", // Or wherever your client is running
        methods: ["GET", "POST"]
    }
});
const path = require('path');

const port = process.env.PORT || 3000;  // Use environment port or 3000

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (your HTML)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html from 'public'
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast message with username
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});