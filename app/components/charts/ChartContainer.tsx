
'use client';
import * as React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  type TooltipItem,
} from "chart.js"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ArrowDown,
  ArrowUp,
  Minus,
  type LucideIcon,
} from "lucide-react"
 
import { cn } from "@/app/lib/utils"
 
ChartJS.register(CategoryScale, LinearScale, Tooltip)
 
/* -----------------------------------------------------------------------------
 * Provider
 * -------------------------------------------------------------------------- */
 
type ChartContextProps = {
  config: ChartConfig
}
 
const ChartContext = createContext<ChartContextProps | null>(null)
 
function useChart() {
  const context = useContext(ChartContext)
 
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
 
  return context
}
 
/* -----------------------------------------------------------------------------
 * ChartContainer
 * -------------------------------------------------------------------------- */
 
type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: LucideIcon
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
}
 
type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ReactNode
}
 
const ChartContainer = ({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) => {
  const [activeChart, setActiveChart] = useState(
    () => Object.keys(config)[0]
  )
 
  const chartConfig = useMemo(() => {
    return {
      ...config,
    }
  }, [config])
 
  return (
    <ChartContext.Provider value={{ config: chartConfig }}>
      <div
        data-active-chart={activeChart}
        className={cn(
          "flex w-full flex-col gap-4 [&>div:first-child]:flex-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}
 
/* -----------------------------------------------------------------------------
 * ChartLegend
 * -------------------------------------------------------------------------- */
 
const ChartLegendContext = createContext<{
  activeChart: string
  setActiveChart: (chart: string) => void
} | null>(null)
 
function useChartLegend() {
  const context = useContext(ChartLegendContext)
 
  if (!context) {
    throw new Error("useChartLegend must be used within a <ChartLegend />")
  }
 
  return context
}
 
const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { config } = useChart()
  const [activeChart, setActiveChart] = useState(Object.keys(config)[0])
 
  if (Object.keys(config).length === 1) {
    return null
  }
 
  return (
    <ChartLegendContext.Provider value={{ activeChart, setActiveChart }}>
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-x-4 gap-y-1", className)}
        {...props}
      />
    </ChartLegendContext.Provider>
  )
})
ChartLegend.displayName = "ChartLegend"
 
const ChartLegendItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    name: string
  }
>(({ className, name, ...props }, ref) => {
  const { config } = useChart()
  const { activeChart, setActiveChart } = useChartLegend()
  const { color, label, icon: Icon } = config[name]
 
  const isActive = activeChart === name
 
  return (
    <div
      ref={ref}
      data-active={isActive}
      className={cn(
        "flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground data-[active=true]:bg-muted/70 data-[active=true]:text-foreground",
        className
      )}
      onClick={() => setActiveChart(name)}
      {...props}
    >
      <div
        className="h-2.5 w-2.5 shrink-0 rounded-sm"
        style={
          {
            "--color-primary": `var(--color-${name})`,
            backgroundColor: "var(--color-primary)",
          } as React.CSSProperties
        }
      />
      {Icon ? (
        <Icon className="mr-1 h-3 w-3" />
      ) : (
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {label}
    </div>
  )
})
ChartLegendItem.displayName = "ChartLegendItem"
 
/* -----------------------------------------------------------------------------
 * ChartTooltip
 * -------------------------------------------------------------------------- */
 
const ChartTooltip = Tooltip
 
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    VariantProps<typeof chartTooltipContentVariants> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      labelKey,
      nameKey,
      ...props
    },
    ref
  ) => {
    const { config } = useChart()
 
    return (
      <div
        ref={ref}
        className={cn(chartTooltipContentVariants({ indicator }), className)}
        {...props}
      >
        {!hideLabel && (
          <div className="text-sm capitalize text-muted-foreground">
            {/* @ts-ignore */}
            {props.label}
          </div>
        )}
        <div className="grid gap-1">
          {/* @ts-ignore */}
          {props.payload?.map((item: TooltipItem<"line" | "bar" | "pie">, i) => {
            const name = nameKey ? item.payload[nameKey] : item.name
            const value = item.value
            const {
              color,
              icon: Icon,
              label,
            } = name ? config[name] ?? config.default ?? {} : config.default
 
            return (
              <div
                key={item.dataKey}
                className="flex items-center gap-1.5"
              >
                {!hideIndicator && (
                  <>
                    {Icon ? (
                      <Icon className="h-3 w-3" />
                    ) : (
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-sm"
                        style={
                          {
                            "--color-primary": `var(--color-${name})`,
                            backgroundColor: "var(--color-primary)",
                          } as React.CSSProperties
                        }
                      />
                    )}
                  </>
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium capitalize text-foreground">
                    {label || name}
                  </div>
                </div>
                {value && (
                  <div className="text-right font-mono text-sm text-foreground">
                    {value.toLocaleString()}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"
 
const chartTooltipContentVariants = cva("rounded-md border p-2 text-sm", {
  variants: {
    indicator: {
      dot: "[&>div:first-child]:capitalize",
      line: "[&>div:first-child]:flex [&>div:first-child]:items-center [&>div:first-child]:gap-1 [&>div:first-child]:capitalize [&>div:first-child]:leading-none",
    },
  },
  defaultVariants: {
    indicator: "dot",
  },
})
 
/* -----------------------------------------------------------------------------
 * ChartIndicator
 * -------------------------------------------------------------------------- */
 
const ChartIndicator = ({
  name,
  className,
}: {
  name: string
  className?: string
}) => {
  const { config } = useChart()
  const { color, icon: Icon } = config[name] ?? {}
 
  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      {Icon ? (
        <Icon />
      ) : (
        <div className="h-2 w-2 rounded-full" style={{ background: color }} />
      )}
      <span className="capitalize">{config[name].label}</span>
    </div>
  )
}
 
/* -----------------------------------------------------------------------------
 * ChartYAxis
 * -------------------------------------------------------------------------- */
 
const ChartYAxis = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showGrid?: boolean
    tickFormatter?: (value: any, index: number) => string
  }
>((props, ref) => {
  const { showGrid = true, tickFormatter, ...rest } = props
 
  const { yScale, yDomain } = useChart()
 
  const ticks = useMemo(() => {
    return yScale.ticks(5)
  }, [yScale])
 
  return (
    <div
      ref={ref}
      className={cn("text-xs text-muted-foreground", props.className)}
      {...rest}
    >
      {ticks.map((tick, i) => {
        const y = yScale(tick)
        return (
          <div
            key={tick}
            className="absolute"
            style={{
              bottom: y,
              width: "calc(100% - var(--y-axis-width, 0px))",
            }}
          >
            {showGrid && (
              <div className="absolute w-full border-t border-dashed" />
            )}
            <div
              className="absolute"
              style={{
                right: "calc(100% + 4px)",
              }}
            >
              {tickFormatter
                ? tickFormatter(tick, i)
                : valueFormatter(tick, {
                    style: "decimal",
                  })}
            </div>
          </div>
        )
      })}
    </div>
  )
})
ChartYAxis.displayName = "ChartYAxis"
 
/* -----------------------------------------------------------------------------
 * ChartXAxis
 * -------------------------------------------------------------------------- */
 
const ChartXAxis = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showGrid?: boolean
    tickFormatter?: (value: any, index: number) => string
    orientation?: "top" | "bottom"
  }
>((props, ref) => {
  const {
    showGrid = true,
    tickFormatter,
    orientation = "bottom",
    ...rest
  } = props
 
  const { xScale, xDomain } = useChart()
 
  const ticks = useMemo(() => {
    return xScale.ticks(5)
  }, [xScale])
 
  return (
    <div
      ref={ref}
      className={cn("text-xs text-muted-foreground", props.className)}
      {...rest}
    >
      {xDomain.map((tick, i) => {
        const x = xScale(tick)
        const y = orientation === "bottom" ? "calc(100% + 4px)" : "-20px"
 
        return (
          <div
            key={tick}
            className="absolute h-full"
            style={{ left: x, height: "calc(100% - var(--x-axis-height, 0px))" }}
          >
            {showGrid && (
              <div className="absolute h-full border-l border-dashed" />
            )}
            <div
              className="absolute"
              style={{
                top: y,
                transform: "translateX(-50%)",
              }}
            >
              {tickFormatter ? tickFormatter(tick, i) : tick}
            </div>
          </div>
        )
      })}
    </div>
  )
})
ChartXAxis.displayName = "ChartXAxis"
 
/* -----------------------------------------------------------------------------
 * ChartSingleTooltip
 * -------------------------------------------------------------------------- */
 
type ChartSingleTooltipProps = {
  value?: number
  label?: string
  unit?: string
  change?: number
  indicator?: "up" | "down" | "none"
  className?: string
}
const ChartSingleTooltip = ({
  value = 0,
  label,
  unit,
  change = 0,
  indicator = "none",
  className,
}: ChartSingleTooltipProps) => {
  return (
    <div className={cn("text-center", className)}>
      {label && (
        <div className="text-lg font-medium text-muted-foreground">{label}</div>
      )}
      <div className="flex items-center justify-center">
        <div className="text-4xl font-bold">
          {valueFormatter(value, {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
        {unit && <div className="text-xl font-bold">{unit}</div>}
        {change > 0 && (
          <div className="ml-2 flex items-center gap-1 text-muted-foreground">
            {indicator === "up" ? (
              <ArrowUp className="h-4 w-4" />
            ) : indicator === "down" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
            {valueFormatter(change, {
              style: "percent",
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
          </div>
        )}
      </div>
    </div>
  )
}
 
/* -----------------------------------------------------------------------------
 * Value Formatter
 * -------------------------------------------------------------------------- */
 
type Formatter = Intl.NumberFormat | ((value: number) => string)
 
function valueFormatter(
  value: number | undefined | null,
  options?: Intl.NumberFormatOptions | Formatter
) {
  if (value === undefined || value === null) {
    return ""
  }
 
  if (typeof options === "function") {
    return options(value)
  }
 
  return new Intl.NumberFormat("en-US", options).format(value)
}
 
export {
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  ChartTooltip,
  ChartTooltipContent,
  ChartIndicator,
  ChartYAxis,
  ChartXAxis,
  ChartSingleTooltip,
  useChart,
  valueFormatter,
  type ChartConfig,
}
