
'use client';
import { Label, Pie, PieChart } from "recharts"
 
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ChartContainer"
 
export default function SentimentChart() {
    const chartData = [
        { browser: "chrome", visitors: 275, fill: "hsl(var(--primary))" },
        { browser: "safari", visitors: 200, fill: "hsl(var(--secondary))" },
        { browser: "firefox", visitors: 187, fill: "hsl(var(--muted))" },
      ]
       
      const chartConfig = {
        visitors: {
          label: "Visitors",
        },
        chrome: {
          label: "Chrome",
          color: "hsl(var(--primary))",
        },
        safari: {
          label: "Safari",
          color: "hsl(var(--secondary))",
        },
        firefox: {
          label: "Firefox",
          color: "hsl(var(--muted))",
        },
      }
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
          dataKey="visitors"
          nameKey="browser"
          innerRadius="60%"
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {chartData.reduce((acc, curr) => acc + curr.visitors, 0).toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
