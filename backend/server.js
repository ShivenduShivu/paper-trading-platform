import WebSocket, { WebSocketServer } from "ws";
import { startMarketFeed, registerClient } from "./marketFeed.js";
import { getAccount, buy, sell } from "./tradingEngine.js";

const PORT = 8080;
let latestPrice = 0;

startMarketFeed(price => {
  latestPrice = price;
});

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", ws => {
  console.log("Client connected");

  // send initial account state
  ws.send(JSON.stringify({
    type: "ACCOUNT_UPDATE",
    account: getAccount()
  }));

  ws.on("message", msg => {
    const data = JSON.parse(msg.toString());

    if (data.type === "BUY") {
      buy(latestPrice);
    }

    if (data.type === "SELL") {
      sell(data.positionId, latestPrice);
    }

    // broadcast updated account
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "ACCOUNT_UPDATE",
          account: getAccount()
        }));
      }
    });
  });

  registerClient(ws);
});

console.log(`Backend running on ws://localhost:${PORT}`);
