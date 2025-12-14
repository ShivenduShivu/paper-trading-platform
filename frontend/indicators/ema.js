import { ema9Series, ema21Series } from "../chart.js";

export function EMAIndicator() {
  return {
    init() {
      ema9Series.applyOptions({ visible: true });
      ema21Series.applyOptions({ visible: true });
    },

    update() {
      // EMA already updates via candle logic
    },

    setVisible(visible) {
      ema9Series.applyOptions({ visible });
      ema21Series.applyOptions({ visible });
    }
  };
}
