import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const defaultData = [
  { name: '0-20%', value: 4 },
  { name: '21-40%', value: 7 },
  { name: '41-60%', value: 14 },
  { name: '61-80%', value: 28 },
  { name: '81-100%', value: 47 }
];

const COLORS = [
  '#EF4444',
  '#F97316',
  '#F59E0B',
  '#22D3EE',
  '#22C55E'
];

export default function Person1ConfidenceScoreChart({
  data = defaultData
}) {
  return (
    <Card
      elevation={0}
      sx={{
        mt: 3,
        minHeight: 380,
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
          AI Confidence Score
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#64748B',
            mb: 2
          }}
        >
          Confidence distribution of AI threat predictions
        </Typography>

        <Box sx={{ width: '100%', height: 290 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="name"
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

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}