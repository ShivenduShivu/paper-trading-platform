import { ensureMACDChart, updateMACD } from "../macd.js";

export function MACDIndicator() {
  return {
    init() {},

    update(price, time) {
      updateMACD(price, time);
    },

    setVisible(visible) {
      document.getElementById("macdChart").style.display =
        visible ? "block" : "none";
      if (visible) ensureMACDChart();
    }
  };
}
