import { state } from "./state.js";

export function buyAtMarket() {
    if (state.balance <= 0) {
        alert("No balance left");
        return;
    }

    const price = state.price;
    const allocation = state.balance * 0.25; // 25% per trade
    const quantity = allocation / price;

    state.positions.push({
        id: Date.now().toString(),
        entryPrice: price,
        quantity,
        openTime: new Date().toLocaleString()
    });

    state.balance -= allocation;
}


export function sellPosition(positionId) {
    const index = state.positions.findIndex(
        p => p.id === positionId
    );

    if (index === -1) return;

    const position = state.positions[index];
    const exitPrice = state.price;
    const value = position.quantity * exitPrice;
    const pnl =
        (exitPrice - position.entryPrice) * position.quantity;

    state.balance += value;

    state.tradeHistory.push({
        entryPrice: position.entryPrice,
        exitPrice,
        quantity: position.quantity,
        pnl: Number(pnl.toFixed(2)),
        openTime: position.openTime,
        closeTime: new Date().toLocaleString()
    });

    state.positions.splice(index, 1);
}
