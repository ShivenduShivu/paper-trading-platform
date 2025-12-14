import { ensureRSIChart } from "./rsi.js";
import { ema9Series, ema21Series } from "./chart.js";
import { initChart } from "./chart.js";
import { updateCandle } from "./candles.js";
import { state, saveState, loadState } from "./state.js";
import { buyAtMarket, sellAtMarket } from "./trading.js";
import { vwapSeries } from "./chart.js";
import { ensureMACDChart, updateMACD } from "./macd.js";



// restore saved state
loadState();
initChart();

// UI references
const priceDiv = document.getElementById("price");
const balanceDiv = document.getElementById("balance");
const buyBtn = document.getElementById("buy");
const sellBtn = document.getElementById("sell");
const historyDiv = document.getElementById("history");
const emaToggle = document.getElementById("emaToggle");
const rsiToggle = document.getElementById("rsiToggle");
const rsiChartDiv = document.getElementById("rsiChart");
const vwapToggle = document.getElementById("vwapToggle");
const macdToggle = document.getElementById("macdToggle");
const macdChartDiv = document.getElementById("macdChart");




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
    const price = Number(data.p);
    const volume = Number(data.q || 1);

    state.price = price;
    updateCandle(price, volume);

    const now = Math.floor(Date.now() / 1000);
    const candleTime = now - (now % 60);

    if (macdToggle.checked) {
        updateMACD(price, candleTime);
    }

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

// EMA toggle
emaToggle.onchange = () => {
    const visible = emaToggle.checked;
    ema9Series.applyOptions({ visible });
    ema21Series.applyOptions({ visible });
};

// RSI toggle
rsiToggle.onchange = () => {
    if (rsiToggle.checked) {
        rsiChartDiv.style.display = "block";
        ensureRSIChart(); // RSI chart created ONLY now
    } else {
        rsiChartDiv.style.display = "none";
    }
};

// default
rsiChartDiv.style.display = "none";

vwapToggle.onchange = () => {
    vwapSeries.applyOptions({ visible: vwapToggle.checked });
};

macdToggle.onchange = () => {
    if (macdToggle.checked) {
        macdChartDiv.style.display = "block";
        ensureMACDChart();
    } else {
        macdChartDiv.style.display = "none";
    }
};

macdChartDiv.style.display = "none";


