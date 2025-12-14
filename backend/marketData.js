const WebSocket = require('ws');

const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

ws.on('message', data => {
  const trade = JSON.parse(data);
  console.log(trade.p);
});
