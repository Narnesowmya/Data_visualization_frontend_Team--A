import { Box } from '@mui/material'
import KpiCard from './KpiCard.jsx'
import { mockStats } from '../services/mockStats.js'
const CARD_CONFIG = [
  { key: 'totalEvents', label: 'Total Events', color: '#38BDF8' },
  { key: 'criticalThreats', label: 'Critical Threats', color: '#FF4D5E' },
  { key: 'highSeverityAlerts', label: 'High Severity Alerts', color: '#FF9F45' },
  { key: 'vulnerabilities', label: 'Vulnerabilities', color: '#F5C84C' },
  { key: 'activeIncidents', label: 'Active Incidents', color: '#34D399' },
  { key: 'maliciousIpMatches', label: 'Malicious IP Matches', color: '#A78BFA' },
]
export default function KpiCards() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {CARD_CONFIG.map((card) => (
        <KpiCard
          key={card.key}
          label={card.label}
          value={mockStats[card.key]}
          color={card.color}
        />
      ))}
    </Box>
  )
}