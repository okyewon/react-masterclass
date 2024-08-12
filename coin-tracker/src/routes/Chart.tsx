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

function Chart() {
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
          type="line"
          options={{
            chart: {
              width: 500,
              height: 350,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: "dark" },
            stroke: {
              width: 3,
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              labels: { show: false },
              type: "datetime",
              categories: data.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
          series={[
            {
              name: "Price",
              data: data.map((price) => price.close),
            },
          ]}
        />
      ) : (
        "Not found data"
      )}
    </div>
  );
}

export default Chart;
