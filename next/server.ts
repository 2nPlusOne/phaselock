// https://github.com/vercel/next.js/discussions/49326


import express from 'express';
import next from 'next';
import { createServer } from 'http';
import { Server } from 'socket.io';

const port = parseInt(process.env.PORT || '3000', 10);
const isDevMode = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '127.0.0.1';
const app = next({ dev: isDevMode, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for 'input-change' event from the client
    socket.on('input-change', (input) => {
      console.log(`Input received: ${input}`);
      // You can emit back to the client or broadcast here
      socket.emit('update-input', input); // Echo back the input to the client
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
