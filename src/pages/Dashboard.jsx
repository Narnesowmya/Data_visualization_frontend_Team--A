import { Box, Typography } from '@mui/material'
import KpiCards from '../components/KpiCards.jsx'

export default function Dashboard() {
  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Security Overview
      </Typography>
      <KpiCards />
    </Box>
  )
}