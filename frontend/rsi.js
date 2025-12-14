export let rsiSeries = null;
let rsiChart = null;
let initialized = false;

export function ensureRSIChart() {
  if (initialized) return;

  const container = document.getElementById("rsiChart");

  rsiChart = window.LightweightCharts.createChart(container, {
    height: 150,
    layout: {
      background: { color: "#0e1117" },
      textColor: "#d1d4dc"
    },
    grid: {
      vertLines: { color: "#1e222d" },
      horzLines: { color: "#1e222d" }
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false
    },
    rightPriceScale: {
      visible: true,
      minValue: 0,
      maxValue: 100
    }
  });

  rsiSeries = rsiChart.addSeries(
    window.LightweightCharts.LineSeries,
    {
      color: "#FFD700", // gold, visible on dark bg
      lineWidth: 2
    }
  );

  rsiChart.timeScale().fitContent();
  initialized = true;
}
