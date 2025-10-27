
'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
 
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ChartContainer"
 
export default function BarChartComponent() {
    const chartData = [
        { category: "Servicio", value: 186, fill: "var(--color-servicio)" },
        { category: "Comida", value: 305, fill: "var(--color-comida)" },
        { category: "Ambiente", value: 237, fill: "var(--color-ambiente)" },
        { category: "Precio", value: 73, fill: "var(--color-precio)" },
      ]
       
      const chartConfig = {
        value: {
          label: "Valor",
        },
        servicio: {
          label: "Servicio",
          color: "#f472b6",
        },
        comida: {
          label: "Comida",
          color: "#a78bfa",
        },
        ambiente: {
            label: "Ambiente",
            color: "#4ade80",
        },
        precio: {
            label: "Precio",
            color: "#facc15",
        }
      }
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="value" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

    