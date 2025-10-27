
'use client';
import { Label, Pie, PieChart, Cell } from "recharts"
 
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ChartContainer"
 
export default function SentimentChart() {
    const chartData = [
        { sentiment: "Positivo", value: 65, fill: "#16a34a" },
        { sentiment: "Neutral", value: 25, fill: "#facc15" },
        { sentiment: "Negativo", value: 10, fill: "#ef4444" },
      ]
       
      const chartConfig = {
        value: {
          label: "Porcentaje",
        },
        Positivo: {
          label: "Positivo",
          color: "#16a34a",
        },
        Neutral: {
          label: "Neutral",
          color: "#facc15",
        },
        Negativo: {
          label: "Negativo",
          color: "#ef4444",
        },
      }
  return (
    <div className="flex items-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[200px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="sentiment"
            innerRadius="60%"
            strokeWidth={5}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="ml-4 flex flex-col gap-2 text-sm">
        {chartData.map((entry) => (
          <div key={entry.sentiment} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <span>{entry.sentiment}</span>
            <span className="ml-auto font-semibold">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

    