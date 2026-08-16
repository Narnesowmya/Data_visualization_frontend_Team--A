import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const data = [
  { name: 'Normal', value: 58 },
  { name: 'Low Anomaly', value: 22 },
  { name: 'Medium Anomaly', value: 13 },
  { name: 'High Anomaly', value: 7 }
];

const COLORS = [
  '#22C55E',
  '#22D3EE',
  '#F59E0B',
  '#EF4444'
];

export default function Person1AnomalyDistribution({ chartData = data }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        minHeight: 360,
        background: 'rgba(18, 17, 31, 0.9)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        borderRadius: '18px'
      }}
    >
      <CardContent sx={{ height: '100%' }}>
        <Typography
          variant="h6"
          sx={{
            color: '#F8FAFC',
            fontWeight: 800
          }}
        >
          Anomaly Distribution
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: '#64748B', mb: 2 }}
        >
          Distribution of detected anomaly levels
        </Typography>

        <Box sx={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={55}
                paddingAngle={3}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: '#12111F',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#F8FAFC'
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}