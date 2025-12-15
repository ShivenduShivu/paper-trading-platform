// ===============================
// INDICATOR SYSTEM
// ===============================
import {
  registerIndicator,
  initIndicators,
  updateIndicators,
  toggleIndicator
} from "./indicators/index.js";

import { EMAIndicator } from "./indicators/ema.js";
import { RSIIndicator } from "./indicators/rsi.js";
import { MACDIndicator } from "./indicators/macd.js";
import { VWAPIndicator } from "./indicators/vwap.js";

// ===============================
// CORE APP IMPORTS
// ===============================
import { initChart } from "./chart.js";
import { updateCandle } from "./candles.js";
import { state, saveState, loadState } from "./state.js";
import { buyAtMarket, sellPosition } from "./trading.js";

// ===============================
// INIT APP
// ===============================
loadState();
initChart();

// register indicators
registerIndicator("ema", EMAIndicator());
registerIndicator("rsi", RSIIndicator());
registerIndicator("macd", MACDIndicator());
registerIndicator("vwap", VWAPIndicator());

initIndicators();

// ===============================
// UI REFERENCES
// ===============================
const priceDiv = document.getElementById("price");
const balanceDiv = document.getElementById("balance");
const positionsDiv = document.getElementById("positions");
const historyDiv = document.getElementById("history");

const buyBtn = document.getElementById("buy");

const emaToggle = document.getElementById("emaToggle");
const rsiToggle = document.getElementById("rsiToggle");
const macdToggle = document.getElementById("macdToggle");
const vwapToggle = document.getElementById("vwapToggle");

// ===============================
// RENDER FUNCTION
// ===============================
function render() {
  balanceDiv.innerText = `Balance: $${state.balance.toFixed(2)}`;
  priceDiv.innerText = `Price: $${state.price}`;

  // ----- OPEN POSITIONS -----
  positionsDiv.innerHTML = "";

  state.positions.forEach(pos => {
    const pnl =
      (state.price - pos.entryPrice) * pos.quantity;

    const row = document.createElement("div");
    row.innerHTML = `
      <div>
        Entry: $${pos.entryPrice} |
        Qty: ${pos.quantity.toFixed(4)} |
        PnL: $${pnl.toFixed(2)}
        <button>SELL</button>
      </div>
    `;

    row.querySelector("button").onclick = () => {
      // 🔑 PASS PRICE EXPLICITLY (FIXES SLOW SELL)
      sellPosition(pos.id, state.price);
      saveState();
      render();
    };

    positionsDiv.appendChild(row);
  });

  // ----- TRADE HISTORY -----
  historyDiv.innerHTML = "";
  state.tradeHistory.forEach((trade, index) => {
    const row = document.createElement("div");
    row.innerText =
      `#${index + 1}
Entry: $${trade.entryPrice}
Exit: $${trade.exitPrice}
PnL: $${trade.pnl}
Opened: ${trade.openTime}
Closed: ${trade.closeTime}`;
    historyDiv.appendChild(row);
  });
}

render();

// ===============================
// LIVE PRICE FEED (BACKEND)
// ===============================
const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const price = data.price;
  const volume = data.volume;

  state.price = price;
  updateCandle(price, volume);

  const now = Math.floor(Date.now() / 1000);
  const candleTime = now - (now % 60);

  updateIndicators(price, candleTime, volume);
  render();
};

// ===============================
// TRADING ACTIONS
// ===============================
buyBtn.onclick = () => {
  buyAtMarket();
  saveState();
  render();
};

// ===============================
// INDICATOR TOGGLES
// ===============================
emaToggle.onchange = () =>
  toggleIndicator("ema", emaToggle.checked);

rsiToggle.onchange = () =>
  toggleIndicator("rsi", rsiToggle.checked);

macdToggle.onchange = () =>
  toggleIndicator("macd", macdToggle.checked);

vwapToggle.onchange = () =>
  toggleIndicator("vwap", vwapToggle.checked);

// ===============================
// SERVICE WORKER
// ===============================
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
