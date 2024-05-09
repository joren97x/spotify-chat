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
});

app.use(cors())

// app.get('/hello', (req, res) => {
//   res.json({ message: 'hello' })
// });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

});


server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});