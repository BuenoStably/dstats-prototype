import { useState, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { Percent, Users, ArrowUpDown, BarChart3, UserMinus } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import LineChartWithGradient from "@/components/charts/LineChartWithGradient";
import { generateMockApyData } from "@/utils/mockApyData";
import PageWrapper from "@/components/layout/PageWrapper";
import MetricsGrid from "@/components/metrics/MetricsGrid";
import { useMetrics } from "@/hooks/useMetrics";

const DLENDPage = () => {
  const { data: metrics, isLoading, error } = useMetrics();
  const [supplyTimeframe, setSupplyTimeframe] = useState("7D");
  const [borrowTimeframe, setBorrowTimeframe] = useState("7D");

  // Generate data based on current timeframe
  const supplyApyData = useMemo(
    () => generateMockApyData(3.5, 4.8, supplyTimeframe),
    [supplyTimeframe]
  );

  const borrowApyData = useMemo(
    () => generateMockApyData(5.2, 5.9, borrowTimeframe),
    [borrowTimeframe]
  );

  const metricsConfig = [
    {
      value: metrics?.debtRatio || "9.0",
      label: "Debt Ratio",
      tooltip: "Current debt ratio of the protocol",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><ArrowUpDown /></Box>,
    },
    {
      value: metrics?.ltv || "80.0%",
      label: "Current LTV",
      tooltip: "Current Loan to Value ratio",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><BarChart3 /></Box>,
    },
    {
      value: metrics?.utilization || "90.0%",
      label: "Current Utilization",
      tooltip: "Current protocol utilization rate",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><Percent /></Box>,
    },
    {
      value: metrics?.lenders || "268",
      label: "Lenders",
      tooltip: "Total number of unique lenders",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><Users /></Box>,
    },
    {
      value: metrics?.borrowers || "127",
      label: "Borrowers",
      tooltip: "Total number of unique borrowers",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><UserMinus /></Box>,
    },
  ];

  const formatPercentage = (value: number) => `${value.toFixed(4)}%`;

  return (
    <PageWrapper title="dLEND Analytics">
      <MetricsGrid metrics={metricsConfig} isLoading={isLoading} error={error instanceof Error ? error : null} />
      <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid container item xs={12} lg={6}>
              <ChartCard 
                title="Raw dUSD Supply APY" 
                onTimeframeChange={setSupplyTimeframe}
              >
                <LineChartWithGradient
                  data={supplyApyData}
                  valueFormatter={formatPercentage}
                  mainLineLabel="Supply APY"
                />
              </ChartCard>
            </Grid>

            <Grid container item xs={12} lg={6}>
              <ChartCard 
                title="Raw dUSD Borrow APY" 
                onTimeframeChange={setBorrowTimeframe}
              >
                <LineChartWithGradient
                  data={borrowApyData}
                  valueFormatter={formatPercentage}
                  mainLineLabel="Borrow APY"
                />
              </ChartCard>
            </Grid>
          </Grid>
      </Box>
    </PageWrapper>
  );
};

export default DLENDPage;
