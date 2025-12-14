import { ensureRSIChart, rsiSeries } from "../rsi.js";

export function RSIIndicator() {
  return {
    init() {},

    update(price, time) {
      ensureRSIChart();
      if (rsiSeries) {
        // RSI values already updated in candle logic
      }
    },

    setVisible(visible) {
      document.getElementById("rsiChart").style.display =
        visible ? "block" : "none";
    }
  };
}
