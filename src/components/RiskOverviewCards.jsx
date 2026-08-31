import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  FiActivity,
  FiAlertTriangle,
  FiArrowUp,
  FiMinus,
  FiArrowDown,
  FiUnlock
} from 'react-icons/fi';

const cards = [
  {
    key: 'totalIncidents',
    title: 'Total Incidents',
    icon: FiActivity,
    color: '#22D3EE'
  },
  {
    key: 'critical',
    title: 'Critical',
    icon: FiAlertTriangle,
    color: '#EF4444'
  },
  {
    key: 'high',
    title: 'High',
    icon: FiArrowUp,
    color: '#F97316'
  },
  {
    key: 'medium',
    title: 'Medium',
    icon: FiMinus,
    color: '#F59E0B'
  },
  {
    key: 'low',
    title: 'Low',
    icon: FiArrowDown,
    color: '#22C55E'
  },
  {
    key: 'openIncidents',
    title: 'Open Incidents',
    icon: FiUnlock,
    color: '#A78BFA'
  }
];

export default function RiskOverviewCards({ stats = {}, loading = false }) {
  return (
    <Grid container spacing={2}>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Grid item xs={12} sm={6} md={4} lg={2} key={card.key}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                minHeight: 145,
                p: 2,
                borderRadius: '14px',
                background:
                  'linear-gradient(145deg, rgba(20, 25, 40, 0.96), rgba(13, 15, 26, 0.96))',
                border: `1px solid ${card.color}40`,
                boxShadow: `0 0 18px ${card.color}12`,
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  borderColor: `${card.color}80`,
                  boxShadow: `0 0 24px ${card.color}25`
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `${card.color}18`,
                    color: card.color
                  }}
                >
                  <Icon size={20} />
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    color: '#64748B',
                    fontWeight: 700
                  }}
                >
                  RISK
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  color: '#F8FAFC',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 0.75
                }}
              >
                {loading ? '—' : stats[card.key] ?? 0}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#94A3B8',
                  fontWeight: 600
                }}
              >
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}