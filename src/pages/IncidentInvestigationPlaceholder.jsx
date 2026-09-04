import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import { FiArrowLeft, FiCompass, FiShield } from 'react-icons/fi';

export default function IncidentInvestigationPlaceholder() {
  const { incidentId } = useParams();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 900,
        mx: 'auto',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Button
        startIcon={<FiArrowLeft />}
        onClick={() => navigate('/dashboard')}
        sx={{
          color: '#94A3B8',
          mb: 3,
          alignSelf: 'flex-start',
          '&:hover': { color: '#22D3EE', backgroundColor: 'rgba(34, 211, 238, 0.08)' }
        }}
      >
        Back to Dashboard
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          textAlign: 'center',
          backgroundColor: 'rgba(18, 17, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(34, 211, 238, 0.25)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
        }}
      >
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: '20px',
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            color: '#22D3EE'
          }}
        >
          <FiCompass size={36} />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 800,
            color: '#F8FAFC',
            mb: 1.5
          }}
        >
          Incident Investigation
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 3 }}>
          <Chip
            icon={<FiShield size={14} />}
            label={`Incident ID: ${incidentId || 'Unknown'}`}
            sx={{
              backgroundColor: 'rgba(249, 115, 22, 0.15)',
              color: '#F97316',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              fontWeight: 800,
              fontSize: '0.85rem',
              px: 1,
              py: 2
            }}
          />
        </Box>

        <Typography variant="body1" sx={{ color: '#94A3B8', maxWidth: 540, mx: 'auto', mb: 4 }}>
          Investigation page — Frontend 2 (In Development). Deep incident forensics, asset impact graphs, and MITRE ATT&CK correlation matrix will be available here.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{
            px: 4,
            py: 1.2
          }}
        >
          Return to Operations Center
        </Button>
      </Paper>
    </Box>
  );
}
