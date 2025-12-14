export let macdLine = null;
export let signalLine = null;
let initialized = false;
let macdChart = null;

let ema12 = null;
let ema26 = null;
let signal = null;

function ema(value, prev, period) {
  const k = 2 / (period + 1);
  return prev === null ? value : value * k + prev * (1 - k);
}

export function ensureMACDChart() {
  if (initialized) return;

  macdChart = window.LightweightCharts.createChart(
    document.getElementById("macdChart"),
    {
      height: 150,
      layout: {
        background: { color: "#0e1117" },
        textColor: "#d1d4dc"
      },
      grid: {
        vertLines: { color: "#1e222d" },
        horzLines: { color: "#1e222d" }
      },
      timeScale: { timeVisible: true }
    }
  );

  macdLine = macdChart.addSeries(
    window.LightweightCharts.LineSeries,
    { color: "lime", lineWidth: 2 }
  );

  signalLine = macdChart.addSeries(
    window.LightweightCharts.LineSeries,
    { color: "red", lineWidth: 2 }
  );

  macdChart.timeScale().fitContent();
  initialized = true;
}

export function updateMACD(price, time) {
  ema12 = ema(price, ema12, 12);
  ema26 = ema(price, ema26, 26);

  if (ema12 === null || ema26 === null) return;

  const macd = ema12 - ema26;
  signal = ema(macd, signal, 9);

  if (macdLine && signalLine) {
    macdLine.update({ time, value: macd });
    signalLine.update({ time, value: signal });
  }
}
