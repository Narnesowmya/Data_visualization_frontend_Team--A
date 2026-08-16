import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import {
  FiCpu,
  FiActivity
} from 'react-icons/fi';

import Person1KpiCards from '../components/person1/Person1KpiCards.jsx';
import Person1AnomalyChart from '../components/person1/Person1AnomalyChart.jsx';
import Person1ConfidenceScoreChart from '../charts/person1/Person1ConfidenceScoreChart.jsx';

export default function Person1Dashboard() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0D0F1A',
        color: '#F8FAFC',
        py: 3
      }}
    >
      <Container maxWidth="xl">

        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontFamily: '"Sora", sans-serif'
              }}
            >
              AI Threat Detection Dashboard
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#94A3B8',
                mt: 0.7
              }}
            >
              AI-powered security monitoring and threat intelligence overview
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1.3,
              borderRadius: '12px',
              background: 'rgba(34, 211, 238, 0.08)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <FiCpu
              size={20}
              color="#22D3EE"
            />

            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: '#22D3EE',
                  fontWeight: 800
                }}
              >
                AI ENGINE ACTIVE
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: '#64748B'
                }}
              >
                Real-time monitoring
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* KPI Section */}
        <Person1KpiCards />

        {/* Section Heading */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2
          }}
        >
          <FiActivity
            color="#22D3EE"
            size={22}
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800
            }}
          >
            Anomaly Intelligence
          </Typography>
        </Box>

        {/* Anomaly Charts */}
        <Person1AnomalyChart />

        {/* Confidence Score */}
        <Grid container>
          <Grid item xs={12}>
            <Person1ConfidenceScoreChart />
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}