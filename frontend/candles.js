import { candleSeries } from "./chart.js";

let currentCandle = null;

export function updateCandle(price) {
  const now = Math.floor(Date.now() / 1000);
  const candleTime = now - (now % 60); // 1-minute candle

  if (!currentCandle || currentCandle.time !== candleTime) {
    currentCandle = {
      time: candleTime,
      open: price,
      high: price,
      low: price,
      close: price
    };

    candleSeries.update(currentCandle);
  } else {
    currentCandle.high = Math.max(currentCandle.high, price);
    currentCandle.low = Math.min(currentCandle.low, price);
    currentCandle.close = price;

    candleSeries.update(currentCandle);
  }
}
