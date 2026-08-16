import React from 'react';
import { Card, CardContent, Box, Typography, Chip } from '@mui/material';

export default function Person1KpiCard({
  title,
  value,
  subtitle,
  icon,
  color = '#22D3EE',
  trend
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        minHeight: 150,
        background: 'rgba(18, 17, 31, 0.9)',
        border: `1px solid ${color}40`,
        borderRadius: '16px',
        boxShadow: `0 0 25px ${color}15`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 0 35px ${color}30`,
          borderColor: `${color}80`
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#94A3B8',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.7px'
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                mt: 1,
                color: '#F8FAFC',
                fontWeight: 800,
                fontFamily: '"Sora", sans-serif'
              }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: '12px',
              backgroundColor: `${color}18`,
              border: `1px solid ${color}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color
            }}
          >
            {icon}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: '#64748B' }}
          >
            {subtitle}
          </Typography>

          {trend && (
            <Chip
              label={trend}
              size="small"
              sx={{
                color,
                backgroundColor: `${color}15`,
                border: `1px solid ${color}40`,
                fontWeight: 700
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}