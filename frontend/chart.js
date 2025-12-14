export let candleSeries;

export function initChart() {
  const chart = window.LightweightCharts.createChart(
    document.getElementById("chart"),
    {
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
      }
    }
  );

  // ✅ NEW API (v5+)
  candleSeries = chart.addSeries(
    window.LightweightCharts.CandlestickSeries
  );
}
