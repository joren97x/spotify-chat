import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors'
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080"
  }
})

app.use(cors())

// app.get('/hello', (req, res) => {
//   res.json({ message: 'hello' })
// });
let users = 0
io.on('connection', (socket) => {
  users++
  console.log('a user connected');
  console.log('active users', users);

  io.emit('active users', users)

  socket.on('disconnect', () => {
    users--
    console.log('user disconnected');
    console.log('active users', users);
    io.emit('active users', users)
  });

  socket.on('connect', () => {
    
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('delete message', (msg) => {
    io.emit('delete message', msg);
  });

});


server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});