"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getYearWiseTransactions } from "../_actions/year-wise-amount";

export const description = "A line chart with dots";

const chartConfig = {
  income: {
    label: "income",
    color: "var(--chart-1)",
  },
  expense: {
    label: "expense",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface IChartType {
  month: string;
  income: number;
  expense: number;
}

export function AmountChart() {
  const [chartData, setChartData] = useState<IChartType[]>();

  useEffect(() => {
    getYearWiseTransactions()
      .then((res) => setChartData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card className="w-[50%]">
      <CardHeader>
        <CardTitle>Income and Expense</CardTitle>
        <CardDescription>January - June 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-auto w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="income"
              type="natural"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-income)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
