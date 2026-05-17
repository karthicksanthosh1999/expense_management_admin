"use client";

import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useSpendingPieChartHook } from "../_hooks/transaction-hook";

const TransactionChart = () => {
  const { data, isLoading } = useSpendingPieChartHook();

  const series = data?.data?.map((item) => item.total);
  const labels = data?.data?.map((item) => item.category);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },

    labels,

    legend: {
      position: "bottom",
      fontSize: "14px",
    },

    dataLabels: {
      enabled: true,
    },

    stroke: {
      width: 0,
    },

    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],

    tooltip: {
      y: {
        formatter: (value) => `₹${value}`,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Transactions Overview</h2>

        <p className="text-sm text-gray-500">
          Category wise transaction summary
        </p>
      </div>

      <div className="flex justify-center">
        <Chart options={options} series={series} type="donut" width="100%" />
      </div>
    </div>
  );
};

export default TransactionChart;
