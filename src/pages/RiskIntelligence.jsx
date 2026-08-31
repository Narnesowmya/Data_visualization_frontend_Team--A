import React from 'react';
import { Box, Typography } from '@mui/material';
import RiskOverviewCards from '../components/RiskOverviewCards.jsx';
import RiskDistributionChart from '../components/RiskDistributionChart.jsx';

export default function RiskIntelligence() {
  const riskStats = {
    totalIncidents: 9,
    critical: 2,
    high: 3,
    medium: 2,
    low: 2,
    openIncidents: 6
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#F8FAFC',
            fontWeight: 800,
            mb: 0.5
          }}
        >
          Risk Intelligence
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#94A3B8'
          }}
        >
          Risk prioritization and security intelligence overview
        </Typography>
      </Box>

      {/* Task 1 — Risk Overview */}
      <RiskOverviewCards
        stats={riskStats}
        loading={false}
      />

      {/* Task 2 — Risk Distribution */}
      <RiskDistributionChart
        stats={riskStats}
        loading={false}
      />

    </Box>
  );
}