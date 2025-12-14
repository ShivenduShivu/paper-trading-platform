import { state, saveState, loadState } from "./state.js";
import { buyAtMarket } from "./trading.js";

// restore saved state
loadState();

// UI references
const priceDiv = document.getElementById("price");
const balanceDiv = document.getElementById("balance");
const buyBtn = document.getElementById("buy");

// update UI
const positionDiv = document.getElementById("position");

function render() {
  balanceDiv.innerText = `Balance: $${state.balance.toFixed(2)}`;
  priceDiv.innerText = `Price: $${state.price}`;

  if (state.position) {
    const pnl =
      (state.price - state.position.entryPrice) *
      state.position.quantity;

    positionDiv.innerText =
      `Position: BTC\nEntry: $${state.position.entryPrice}\nPnL: $${pnl.toFixed(2)}`;
  } else {
    positionDiv.innerText = "No open position";
  }
}


render();

/* ===============================
   LIVE PRICE (BINANCE WEBSOCKET)
================================ */
const ws = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@trade"
);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  state.price = Number(data.p);
  render();
};

// BUY BUTTON
buyBtn.onclick = () => {
  buyAtMarket();
  saveState();
  render();
};

// service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
