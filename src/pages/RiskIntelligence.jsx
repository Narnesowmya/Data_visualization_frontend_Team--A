import React from 'react';
import { Box, Typography } from '@mui/material';

import RiskOverviewCards from '../components/RiskOverviewCards.jsx';
import RiskDistributionChart from '../components/RiskDistributionChart.jsx';
import RiskTrendChart from '../components/RiskTrendChart.jsx';

export default function RiskIntelligence() {
  // Temporary frontend data for Milestone 3.
  // This will later be connected to the backend risk assessment data.
  const riskStats = {
    totalIncidents: 9,
    critical: 2,
    high: 3,
    medium: 2,
    low: 2,
    openIncidents: 6
  };

  // Task 3 — Risk Trend data
  const riskTrendData = [
    {
      timestamp: '10:00',
      riskScore: 42
    },
    {
      timestamp: '12:00',
      riskScore: 58
    },
    {
      timestamp: '14:00',
      riskScore: 71
    },
    {
      timestamp: '16:00',
      riskScore: 65
    },
    {
      timestamp: '18:00',
      riskScore: 89
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        p: {
          xs: 2,
          sm: 2.5,
          md: 3
        }
      }}
    >
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#F8FAFC',
            fontWeight: 800,
            fontSize: {
              xs: '1.8rem',
              sm: '2rem',
              md: '2.2rem'
            },
            mb: 0.5
          }}
        >
          Risk Intelligence
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#94A3B8',
            fontSize: {
              xs: '0.8rem',
              sm: '0.875rem'
            }
          }}
        >
          Risk prioritization and security intelligence overview
        </Typography>
      </Box>

      {/* =====================================================
          TASK 1 — RISK OVERVIEW
          ===================================================== */}
      <RiskOverviewCards
        stats={riskStats}
        loading={false}
      />

      {/* =====================================================
          TASK 2 — RISK DISTRIBUTION
          ===================================================== */}
      <RiskDistributionChart
        stats={{
          critical: riskStats.critical,
          high: riskStats.high,
          medium: riskStats.medium,
          low: riskStats.low
        }}
        loading={false}
      />

      {/* =====================================================
          TASK 3 — RISK TREND
          ===================================================== */}
      <RiskTrendChart
        data={riskTrendData}
        loading={false}
      />
    </Box>
  );
}