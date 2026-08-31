import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';

import {
  FiActivity,
  FiAlertTriangle,
  FiTrendingUp,
  FiMinusCircle,
  FiArrowDownCircle,
  FiClock
} from 'react-icons/fi';

const CARD_DATA = [
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
    icon: FiTrendingUp,
    color: '#F97316'
  },
  {
    key: 'medium',
    title: 'Medium',
    icon: FiMinusCircle,
    color: '#F59E0B'
  },
  {
    key: 'low',
    title: 'Low',
    icon: FiArrowDownCircle,
    color: '#22C55E'
  },
  {
    key: 'openIncidents',
    title: 'Open Incidents',
    icon: FiClock,
    color: '#8B5CF6'
  }
];

export default function RiskOverviewCards({
  stats = {},
  loading = false
}) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        m: 0
      }}
    >
      {CARD_DATA.map((card) => {
        const Icon = card.icon;

        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={card.key}
          >
            <Card
              elevation={0}
              sx={{
                height: '100%',
                minHeight: 145,
                borderRadius: '16px',
                background:
                  'linear-gradient(145deg, rgba(20, 25, 40, 0.96), rgba(13, 15, 26, 0.96))',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                transition:
                  'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',

                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: card.color,
                  boxShadow: `0 8px 25px ${card.color}25`
                }
              }}
            >
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2.2,
                  '&:last-child': {
                    pb: 2.2
                  }
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `${card.color}18`,
                    border: `1px solid ${card.color}45`,
                    color: card.color
                  }}
                >
                  <Icon size={21} />
                </Box>

                {/* Value */}
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      color: '#F8FAFC',
                      fontSize: {
                        xs: '1.6rem',
                        sm: '1.75rem'
                      },
                      lineHeight: 1,
                      fontWeight: 800
                    }}
                  >
                    {loading ? '—' : (stats[card.key] ?? 0)}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#94A3B8',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      mt: 0.8
                    }}
                  >
                    {card.title}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}