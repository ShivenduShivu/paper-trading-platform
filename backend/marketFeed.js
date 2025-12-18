import WebSocket from "ws";

const BINANCE_WS =
  "wss://stream.binance.com:9443/ws/btcusdt@trade";

let latestTick = null;
const clients = new Set();

export function startMarketFeed(onPrice) {
  const ws = new WebSocket(BINANCE_WS);

  ws.on("message", msg => {
    const data = JSON.parse(msg.toString());

    latestTick = {
      type: "PRICE",
      price: Number(data.p),
      volume: Number(data.q),
      time: data.T
    };

    // notify server about latest price
    onPrice(latestTick.price);

    // broadcast PRICE message
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(latestTick));
      }
    });
  });

  ws.on("close", () => {
    console.log("Binance disconnected. Reconnecting...");
    setTimeout(() => startMarketFeed(onPrice), 2000);
  });

  ws.on("error", console.error);
}

export function registerClient(ws) {
  clients.add(ws);

  if (latestTick) {
    ws.send(JSON.stringify(latestTick));
  }

  ws.on("close", () => clients.delete(ws));
}
