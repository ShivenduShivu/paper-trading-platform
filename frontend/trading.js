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
    quantity
  };

  state.balance = 0;
}
