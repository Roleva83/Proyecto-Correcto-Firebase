
'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
 
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ChartContainer"
 
export default function BarChartComponent() {
    const chartData = [
        { month: "Servicio", desktop: 186 },
        { month: "Comida", desktop: 305 },
        { month: "Ambiente", desktop: 237 },
        { month: "Precio", desktop: 73 },
      ]
       
      const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--primary))",
        },
      }
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
