"use client";

import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useSpendingPieChartHook } from "../_hooks/transaction-hook";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const TransactionChart = () => {
  const { theme }= useTheme();

  const { data, isLoading } = useSpendingPieChartHook();

  const series = data?.data?.map((item) => Number(item.total)) ?? [];
  const labels = data?.data?.map((item) => item.category) ?? [];
 
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
      fontSize: "12px",
     labels: {
      colors: theme === "dark" ? "#ffffff" : "#000",
    },
    },
    dataLabels: {
      enabled: true,
    },
    markers:{
      size: 100,
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
      </div>
    <Separator className={'my-2'}/>
      <div className="flex justify-center">
        {
          isLoading ? (
            <Skeleton className="size-60 rounded-full flex items-center justify-center">
              <div className="size-40 bg-card rounded-full"></div>
            </Skeleton>
          ) : (
            <Chart
            options={options}
            series={series ?? []}
            type="donut"
            width="100%"
          />
          )
        }
      </div>
    </div>
  );
};

export default TransactionChart;
