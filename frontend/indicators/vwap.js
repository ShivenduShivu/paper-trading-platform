import { vwapSeries } from "../chart.js";

export function VWAPIndicator() {
  return {
    init() {
      vwapSeries.applyOptions({ visible: false });
    },

    update(price, time, volume) {
      // VWAP updates from candle logic
    },

    setVisible(visible) {
      vwapSeries.applyOptions({ visible });
    }
  };
}
