import { Card, CardContent, Typography, Box, Button, Stack } from '@mui/material';
import { useState } from "react";

interface LegendItem {
  color: string;
  label: string;
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  onTimeframeChange?: (timeframe: string) => void;
  className?: string;
  legend?: LegendItem[];
  showTimeframes?: boolean;
}

const ChartCard = ({ 
  title, 
  children, 
  onTimeframeChange, 
  className, 
  legend,
  showTimeframes = true
}: ChartCardProps) => {
  const timeframes = ["7D", "30D", "6M", "1Y", "All"];
  const [selectedTimeframe, setSelectedTimeframe] = useState("7D");

  const handleTimeframeClick = (tf: string) => {
    setSelectedTimeframe(tf);
    if (onTimeframeChange) {
      onTimeframeChange(tf);
    }
  };

  return (
    <Card 
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        p: { xs: 2, sm: 3 }
      }}
      className={className}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          mb={3}
        >
          <Box sx={{ width: '100%' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white', 
                fontWeight: 600, 
                mb: legend ? 1 : 0,
                pl: 0 // Explicitly set padding-left to 0
              }}
            >
              {title}
            </Typography>
            {legend && (
              <Stack direction="row" spacing={2} sx={{ pl: 0 }}> {/* Explicitly set padding-left to 0 */}
                {legend.map((item, index) => (
                  <Stack key={index} direction="row" spacing={1} alignItems="center">
                    <Box 
                      sx={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '2px',
                        bgcolor: item.color 
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: 'rgb(156, 163, 175)' }}>
                      {item.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </Box>
          {showTimeframes && onTimeframeChange && (
            <Stack direction="row" spacing={1}>
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  variant={selectedTimeframe === tf ? "contained" : "text"}
                  size="small"
                  onClick={() => handleTimeframeClick(tf)}
                  sx={{
                    minWidth: 0,
                    px: 1.5,
                    color: selectedTimeframe === tf ? 'white' : 'rgb(156, 163, 175)',
                    bgcolor: selectedTimeframe === tf ? '#8702ff' : 'transparent',
                    '&:hover': {
                      bgcolor: selectedTimeframe === tf ? '#7002d6' : 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {tf}
                </Button>
              ))}
            </Stack>
          )}
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;