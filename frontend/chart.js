const chart = LightweightCharts.createChart(
  document.getElementById('chart'),
  { width: 600, height: 300 }
);

const candleSeries = chart.addCandlestickSeries();
