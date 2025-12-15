import WebSocket, { WebSocketServer } from "ws";
import { startMarketFeed, registerClient } from "./marketFeed.js";

const PORT = 8080;

startMarketFeed();

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", ws => {
  console.log("Client connected");
  registerClient(ws);
});

console.log(`Backend WebSocket running on ws://localhost:${PORT}`);
