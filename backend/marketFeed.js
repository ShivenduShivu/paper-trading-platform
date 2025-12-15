import WebSocket from "ws";

const BINANCE_WS =
  "wss://stream.binance.com:9443/ws/btcusdt@trade";

let latestTick = null;
const clients = new Set();

export function startMarketFeed() {
  const ws = new WebSocket(BINANCE_WS);

  ws.on("message", msg => {
    const data = JSON.parse(msg.toString());

    latestTick = {
      price: Number(data.p),
      volume: Number(data.q),
      time: data.T
    };

    // broadcast to clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(latestTick));
      }
    });
  });

  ws.on("close", () => {
    console.log("Binance disconnected. Reconnecting...");
    setTimeout(startMarketFeed, 2000);
  });

  ws.on("error", console.error);
}

export function registerClient(ws) {
  clients.add(ws);

  // send last known price immediately
  if (latestTick) {
    ws.send(JSON.stringify(latestTick));
  }

  ws.on("close", () => clients.delete(ws));
}
