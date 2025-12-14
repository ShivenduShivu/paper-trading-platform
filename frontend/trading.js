import { state } from "./state.js";

export function buyAtMarket() {
    if (state.position) {
        alert("Position already open");
        return;
    }

    const price = state.price;

    if (!price) {
        alert("Price not available yet");
        return;
    }

    const quantity = state.balance / price;

    state.position = {
        entryPrice: price,
        quantity,
        openTime: new Date().toLocaleString()
    };

    state.balance = 0;
}

export function sellAtMarket() {
    if (!state.position) {
        alert("No open position to sell");
        return;
    }

    const price = state.price;

    const finalValue =
        state.position.quantity * price;

    const pnl =
        (price - state.position.entryPrice) *
        state.position.quantity;

    state.tradeHistory.push({
        entryPrice: state.position.entryPrice,
        exitPrice: price,
        quantity: state.position.quantity,
        pnl: Number(pnl.toFixed(2)),
        openTime: state.position.openTime,
        closeTime: new Date().toLocaleString()
    });

    state.balance = finalValue;
    state.position = null;

}
