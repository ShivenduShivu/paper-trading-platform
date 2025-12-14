import { initChart } from "./chart.js";
import { updateCandle } from "./candles.js";
import { state, saveState, loadState } from "./state.js";
import { buyAtMarket, sellAtMarket } from "./trading.js";


// restore saved state
loadState();
initChart();

// UI references
const priceDiv = document.getElementById("price");
const balanceDiv = document.getElementById("balance");
const buyBtn = document.getElementById("buy");
const sellBtn = document.getElementById("sell");
const historyDiv = document.getElementById("history");



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
    // Render trade history
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

/* ===============================
   LIVE PRICE (BINANCE WEBSOCKET)
================================ */
const ws = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@trade"
);

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    state.price = Number(data.p);
    updateCandle(state.price);
    render();
};

// BUY BUTTON
buyBtn.onclick = () => {
    buyAtMarket();
    saveState();
    render();
};
// SELL BUTTON
sellBtn.onclick = () => {
    sellAtMarket();
    saveState();
    render();
};


// service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}
