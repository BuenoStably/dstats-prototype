import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface CandlestickData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  barHeight: number;
  barStart: number;
  isUp: boolean;
  wickTop: number;
  wickBottom: number;
}

interface CandlestickChartProps {
  data: Array<{ date: string; value: number }>;
  valueFormatter: (value: number) => string;
}

const CandlestickChart = ({
  data,
  valueFormatter,
}: CandlestickChartProps) => {
  const processedData = data.map((item, index) => {
    const prevValue = index > 0 ? data[index - 1].value : item.value;
    const open = prevValue;
    const close = item.value;
    
    const volatilityBase = 0.005;
    const randomUpWick = Math.random() * volatilityBase;
    const randomDownWick = Math.random() * volatilityBase;
    
    const high = Math.max(open, close) * (1 + randomUpWick);
    const low = Math.min(open, close) * (1 - randomDownWick);
    const isUp = close > open;

    const barHeight = Math.abs(close - open);
    const barStart = Math.min(open, close);

    return {
      ...item,
      open,
      close,
      high,
      low,
      barHeight,
      barStart,
      isUp,
      wickTop: high - Math.max(open, close),
      wickBottom: Math.min(open, close) - low,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart 
        data={processedData}
        margin={{ top: 10, right: 10, left: 10, bottom: 25 }}
      >
        <XAxis
          dataKey="date"
          tickFormatter={(value) => format(new Date(value), "MMM d")}
          stroke="#4B5563"
          tick={{ fill: '#4B5563' }}
          tickLine={{ stroke: '#4B5563' }}
          axisLine={{ stroke: '#4B5563' }}
          dy={8}
          angle={-45}
          textAnchor="end"
          height={45}
          interval={0}
          minTickGap={5}
        />
        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={valueFormatter}
          stroke="transparent"
          tick={{ fill: '#ffffff' }}
          tickLine={{ stroke: 'transparent' }}
          axisLine={{ stroke: 'transparent' }}
          width={60}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload as CandlestickData;
              return (
                <div className="bg-card p-3 border border-white/10 rounded-xl backdrop-blur-sm">
                  <p className="text-white text-xs mb-1">
                    {format(new Date(label), "MMM d, yyyy")}
                  </p>
                  <p className="text-white text-xs">
                    Open: {valueFormatter(data.open)}
                  </p>
                  <p className="text-white text-xs">
                    Close: {valueFormatter(data.close)}
                  </p>
                  <p className="text-white text-xs">
                    High: {valueFormatter(data.high)}
                  </p>
                  <p className="text-white text-xs">
                    Low: {valueFormatter(data.low)}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="barHeight"
          fill="#22C55E"
          stroke="#22C55E"
          barSize={8}
          stackId="candlestick"
          yAxisId={0}
        />
        <Bar
          dataKey="wickTop"
          fill="#22C55E"
          stroke="#22C55E"
          barSize={2}
          stackId="upperWick"
          yAxisId={0}
        />
        <Bar
          dataKey="wickBottom"
          fill="#22C55E"
          stroke="#22C55E"
          barSize={2}
          stackId="lowerWick"
          yAxisId={0}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;
