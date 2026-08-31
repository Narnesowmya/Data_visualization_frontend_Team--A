import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function RiskTrendChart({
  data = [],
  loading = false
}) {
  const chartData = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: 'Risk Score',
        data: data.map((item) => item.riskScore),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        borderWidth: 3,
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 7
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#94A3B8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        title: {
          display: true,
          text: 'Date / Time',
          color: '#CBD5E1'
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#94A3B8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        title: {
          display: true,
          text: 'Risk Score',
          color: '#CBD5E1'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#CBD5E1'
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return ` Risk Score: ${context.raw}`;
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
        border: '1px solid rgba(148, 163, 184, 0.15)'
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
          Risk Trend
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#94A3B8',
            mt: 0.5
          }}
        >
          Risk score trend over time
        </Typography>
      </Box>

      <Box
        sx={{
          height: 350,
          position: 'relative'
        }}
      >
        {loading ? (
          <Typography sx={{ color: '#94A3B8' }}>
            Loading risk trend...
          </Typography>
        ) : (
          <Line
            data={chartData}
            options={options}
          />
        )}
      </Box>
    </Paper>
  );
}