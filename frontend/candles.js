import {
  candleSeries,
  ema9Series,
  ema21Series
} from "./chart.js";

let currentCandle = null;
let closes = [];
let ema9 = null;
let ema21 = null;

function calculateEMA(price, prevEMA, period) {
  const k = 2 / (period + 1);
  return prevEMA === null
    ? price
    : price * k + prevEMA * (1 - k);
}

export function updateCandle(price) {
  const now = Math.floor(Date.now() / 1000);
  const candleTime = now - (now % 60);

  if (!currentCandle || currentCandle.time !== candleTime) {
    currentCandle = {
      time: candleTime,
      open: price,
      high: price,
      low: price,
      close: price
    };

    candleSeries.update(currentCandle);

    // new candle → store close
    closes.push(price);

    ema9 = calculateEMA(price, ema9, 9);
    ema21 = calculateEMA(price, ema21, 21);

    ema9Series.update({ time: candleTime, value: ema9 });
    ema21Series.update({ time: candleTime, value: ema21 });

  } else {
    currentCandle.high = Math.max(currentCandle.high, price);
    currentCandle.low = Math.min(currentCandle.low, price);
    currentCandle.close = price;

    candleSeries.update(currentCandle);
  }
}
