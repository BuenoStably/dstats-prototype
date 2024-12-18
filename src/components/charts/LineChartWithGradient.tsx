import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { Box, Typography } from "@mui/material";

interface LineChartWithGradientProps {
  data: Array<{ date: string; value: number }>;
  valueFormatter?: (value: number) => string;
  yAxisFormatter?: (value: number) => string;
  showSecondLine?: boolean;
  secondLineData?: any[];
  secondLineKey?: string;
  secondLineColor?: string;
  useAreaGradient?: boolean;
  yAxisDomain?: [number | string | undefined, number | string | undefined];
  mainLineLabel?: string;
  secondLineLabel?: string;
}

const LineChartWithGradient = ({
  data,
  valueFormatter = (value: number) => value.toString(),
  yAxisFormatter,
  showSecondLine,
  secondLineData,
  secondLineKey = "value",
  secondLineColor = "#22C55E",
  useAreaGradient = false,
  yAxisDomain,
  mainLineLabel = "Value",
  secondLineLabel = "Second Value",
}: LineChartWithGradientProps) => {
  
  const getMaxValue = () => {
    const values = data.map(item => item.value);
    if (showSecondLine && secondLineData) {
      values.push(...secondLineData.map(item => item[secondLineKey]));
    }
    const maxValue = Math.ceil(Math.max(...values));
    return Math.max(maxValue, 10);
  };

  const calculateInterval = () => {
    const dataLength = data.length;
    if (dataLength <= 5) return 0;
    return Math.ceil(dataLength / 5); // Show roughly 5 points
  };

  const formatYAxisTick = (value: number) => {
    if (yAxisFormatter) {
      return yAxisFormatter(value);
    }
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'rgb(31, 29, 43)',
            p: 1.5,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="body2" sx={{ color: "rgb(156, 163, 175)", mb: 1 }}>
            {format(new Date(label), "MMM d, yyyy")}
          </Typography>
          {payload.map((entry: any, index: number) => {
            const isMainLine = entry.dataKey === "value";
            return (
              <Typography 
                key={index} 
                variant="body2" 
                sx={{ 
                  color: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  mb: 0.5
                }}
              >
                <span style={{ color: entry.color }}>
                  {isMainLine ? mainLineLabel : secondLineLabel}:
                </span>
                <span style={{ fontFamily: 'monospace' }}>
                  {valueFormatter(entry.value)}
                </span>
              </Typography>
            );
          })}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", aspectRatio: "16/9" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 16, bottom: 25 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8702ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8702ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEthereum" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={secondLineColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={secondLineColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), "MMM d")}
            stroke="#4B5563"
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#4B5563' }}
            axisLine={{ stroke: '#4B5563' }}
            interval={calculateInterval()}
            minTickGap={50}
          />
          <YAxis
            stroke="transparent"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: 'transparent' }}
            axisLine={{ stroke: 'transparent' }}
            width={window.innerWidth < 768 ? 35 : 50}
            domain={yAxisDomain || [0, getMaxValue()]}
            allowDecimals={false}
            tickFormatter={formatYAxisTick}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8702ff"
            strokeWidth={2}
            fill={useAreaGradient ? "url(#colorValue)" : "none"}
            fillOpacity={1}
            name={mainLineLabel}
          />
          {showSecondLine && secondLineData && (
            <Area
              type="monotone"
              data={secondLineData}
              dataKey={secondLineKey}
              stroke={secondLineColor}
              strokeWidth={2}
              fill={useAreaGradient ? "url(#colorEthereum)" : "none"}
              fillOpacity={1}
              name={secondLineLabel}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartWithGradient;
