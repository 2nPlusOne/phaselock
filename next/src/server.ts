// https://github.com/vercel/next.js/discussions/49326

import express from "express";
import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";
import { Events } from "./lib/events";
import RoomManager from "./lib/managers/RoomManager";
import GameStateManager from "./lib/managers/GameStateManager";

const port = parseInt(process.env.PORT || "3000", 10);
const isDevMode = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "127.0.0.1";
const app = next({ dev: isDevMode, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer);

  new RoomManager(io);
  new GameStateManager(io);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
