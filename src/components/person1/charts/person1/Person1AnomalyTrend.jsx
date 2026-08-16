import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const defaultData = [
  { time: '00:00', anomalies: 8 },
  { time: '04:00', anomalies: 12 },
  { time: '08:00', anomalies: 18 },
  { time: '12:00', anomalies: 14 },
  { time: '16:00', anomalies: 25 },
  { time: '20:00', anomalies: 21 },
  { time: '24:00', anomalies: 29 }
];

export default function Person1AnomalyTrend({
  chartData = defaultData
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        minHeight: 360,
        background: 'rgba(18, 17, 31, 0.9)',
        border: '1px solid rgba(34, 211, 238, 0.25)',
        borderRadius: '18px'
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: '#F8FAFC',
            fontWeight: 800
          }}
        >
          Anomaly Trend
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: '#64748B', mb: 2 }}
        >
          Anomalies detected over the last 24 hours
        </Typography>

        <Box sx={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="time"
                stroke="#64748B"
              />

              <YAxis
                stroke="#64748B"
              />

              <Tooltip
                contentStyle={{
                  background: '#12111F',
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />

              <Line
                type="monotone"
                dataKey="anomalies"
                stroke="#22D3EE"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}