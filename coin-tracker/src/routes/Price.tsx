import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : data ? (
        <ReactApexChart
          type="candlestick"
          options={{
            chart: {
              width: 500,
              height: 350,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: "dark" },
            stroke: {
              width: 0,
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              labels: { show: false },
              type: "datetime",
              categories: data.map((price) => price.time_close),
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
              },
            },
          }}
          series={[
            {
              name: "Price",
              data: data.map((price) => {
                return {
                  x: new Date(price.time_close),
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
        />
      ) : (
        "Not found data"
      )}
    </div>
  );
}

export default Price;
