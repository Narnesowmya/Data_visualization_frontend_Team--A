import { Box, Typography } from '@mui/material'
import KpiCards from '../components/KpiCards.jsx'

export default function Dashboard() {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Dashboard Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          AI Threat Detection Dashboard
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Real-time security monitoring and threat analysis
        </Typography>
      </Box>

      {/* KPI Cards */}
      <KpiCards />
    </Box>
  )
}