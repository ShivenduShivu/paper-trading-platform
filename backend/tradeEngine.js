function buy(balance, price) {
  const quantity = balance / price;
  return {
    entry: price,
    qty: quantity
  };
}
