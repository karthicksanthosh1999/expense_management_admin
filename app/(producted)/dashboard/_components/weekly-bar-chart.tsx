"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useWeeklyBarChartHook } from "../_hooks/ai-hook";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A bar chart"

const chartConfig = {
  total: {
    label: "total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function WeeklyBarChart() {

    const { data, isLoading } = useWeeklyBarChartHook();
    const chartData = data?.data || [];
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Daily Transactions</CardTitle>
        <CardDescription>Sun - Mon</CardDescription>
      </CardHeader>
      <Separator className='px-5' />
      <CardContent>
        {
            isLoading ? (
                <div className="flex items-end justify-center gap-5 w-full">
                    <Skeleton className="w-14 h-full" />
                    <Skeleton className="w-14 h-20" />
                    <Skeleton className="w-14 h-32" />
                    <Skeleton className="w-14 h-20" />
                    <Skeleton className="w-14 h-32" />
                </div>
            ) : (
                <ChartContainer config={chartConfig} className="w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="total" fill="var(--color-total)" radius={8} />
                        </BarChart>
                        </ChartContainer>
            )
        }
        </CardContent>
    </Card>
  )
}
