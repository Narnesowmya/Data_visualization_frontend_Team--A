import { Paper, Typography, Box } from '@mui/material'

export default function KpiCard({ label, value, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 160,
        p: 2.5,
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.08)',
        borderLeft: '3px solid',
        borderLeftColor: color,
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}
      >
        {label}
      </Typography>
      <Box sx={{ mt: 0.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {value.toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  )
}