
'use client';
import {
  Pie,
  PieChart,
} from "recharts"
 
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ChartContainer"
 
export default function DonutChart() {
    const chartData = [
      { name: 'Used', value: 48, fill: 'hsl(var(--primary))' },
      { name: 'Remaining', value: 52, fill: 'hsl(var(--secondary))' },
    ];
    const chartConfig = {
      value: {
        label: "Value",
      },
      Used: {
        label: "Used",
        color: "hsl(var(--primary))",
      },
      Remaining: {
        label: "Remaining",
        color: "hsl(var(--secondary))",
      },
    };
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius="60%"
          strokeWidth={5}
          startAngle={90}
          endAngle={450}
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-2xl font-bold"
          >
            48%
          </text>
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

    