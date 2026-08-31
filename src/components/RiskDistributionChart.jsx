import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function RiskDistributionChart({
  stats = {},
  loading = false
}) {
  const data = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [
          stats.critical ?? 0,
          stats.high ?? 0,
          stats.medium ?? 0,
          stats.low ?? 0
        ],
        backgroundColor: [
          '#EF4444',
          '#F97316',
          '#F59E0B',
          '#22C55E'
        ],
        borderColor: '#0F172A',
        borderWidth: 3,
        hoverOffset: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#CBD5E1',
          padding: 18,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw ?? 0;
            return ` ${context.label}: ${value}`;
          }
        }
      }
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        p: 3,
        borderRadius: '16px',
        background:
          'linear-gradient(145deg, rgba(20, 25, 40, 0.96), rgba(13, 15, 26, 0.96))',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        minHeight: 400
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#F8FAFC',
            fontWeight: 800
          }}
        >
          Risk Distribution
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#94A3B8',
            mt: 0.5
          }}
        >
          Distribution of incidents by risk severity
        </Typography>
      </Box>

      <Box
        sx={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {loading ? (
          <Typography sx={{ color: '#94A3B8' }}>
            Loading risk distribution...
          </Typography>
        ) : (
          <Doughnut
            data={data}
            options={options}
          />
        )}
      </Box>
    </Paper>
  );
}