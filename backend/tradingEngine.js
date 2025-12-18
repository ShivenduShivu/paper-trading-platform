const account = {
  balance: 10000,
  positions: [],
  tradeHistory: []
};

export function getAccount() {
  return account;
}

export function buy(price) {
  const allocation = account.balance * 0.25;
  if (allocation <= 0) return;

  const quantity = allocation / price;

  account.positions.push({
    id: Date.now().toString(),
    entryPrice: price,
    quantity,
    openTime: new Date().toLocaleString()
  });

  account.balance -= allocation;
}

export function sell(positionId, price) {
  const index = account.positions.findIndex(
    p => p.id === positionId
  );
  if (index === -1) return;

  const pos = account.positions[index];
  const value = pos.quantity * price;
  const pnl = (price - pos.entryPrice) * pos.quantity;

  account.balance += value;

  account.tradeHistory.push({
    entryPrice: pos.entryPrice,
    exitPrice: price,
    quantity: pos.quantity,
    pnl: Number(pnl.toFixed(2)),
    openTime: pos.openTime,
    closeTime: new Date().toLocaleString()
  });

  account.positions.splice(index, 1);
}
