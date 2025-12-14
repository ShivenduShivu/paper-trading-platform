export let candleSeries;
export let ema9Series;
export let ema21Series;

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

  candleSeries = chart.addSeries(
    window.LightweightCharts.CandlestickSeries
  );

  ema9Series = chart.addSeries(
    window.LightweightCharts.LineSeries,
    { color: "orange", lineWidth: 2 }
  );

  ema21Series = chart.addSeries(
    window.LightweightCharts.LineSeries,
    { color: "cyan", lineWidth: 2 }
  );
}
