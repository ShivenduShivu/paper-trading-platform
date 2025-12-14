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
import { buyAtMarket, sellAtMarket } from "./trading.js";

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
const positionDiv = document.getElementById("position");
const historyDiv = document.getElementById("history");

const buyBtn = document.getElementById("buy");
const sellBtn = document.getElementById("sell");

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

    if (state.position) {
        const pnl =
            (state.price - state.position.entryPrice) *
            state.position.quantity;

        positionDiv.innerText =
            `Position: BTC
Entry: $${state.position.entryPrice}
PnL: $${pnl.toFixed(2)}`;
    } else {
        positionDiv.innerText = "No open position";
    }

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
// LIVE PRICE FEED (BINANCE)
// ===============================
const ws = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@trade"
);

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const price = Number(data.p);
    const volume = Number(data.q || 1);

    state.price = price;
    updateCandle(price, volume);

    const now = Math.floor(Date.now() / 1000);
    const candleTime = now - (now % 60);

    // 🔑 SINGLE ENTRY POINT FOR ALL INDICATORS
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

sellBtn.onclick = () => {
    sellAtMarket();
    saveState();
    render();
};

// ===============================
// INDICATOR TOGGLES (CLEAN)
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
