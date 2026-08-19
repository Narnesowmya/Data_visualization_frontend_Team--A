import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Chip, CircularProgress } from '@mui/material'
import { FiShield, FiTrendingUp } from 'react-icons/fi'
import { getAnalyticsData, getEvents } from '../services/api.js'
import { SEVERITY_COLORS } from '../theme/socTheme.js'

export default function ThreatIntelligence() {
    const [analytics, setAnalytics] = useState(null)
    const [highRiskEvents, setHighRiskEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            getAnalyticsData(),
            getEvents({ severity: 'Critical' })
        ])
            .then(([analyticsData, criticalEvents]) => {
                setAnalytics(analyticsData)
                setHighRiskEvents((criticalEvents.events || []).slice(0, 8))
                setError(null)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#22D3EE' }} />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography sx={{ color: '#F87171' }}>Failed to load threat intelligence: {error}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                Threat Intelligence
            </Typography>

            {/* Top Attack Types */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: 'rgba(18, 17, 31, 0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(34, 211, 238, 0.15)',
                    borderRadius: '16px'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
                    <FiTrendingUp size={20} color="#22D3EE" />
                    <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC' }}>
                        Top Attack Vectors
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {analytics?.topAttackTypes?.map((attack) => {
                        const maxCount = analytics.topAttackTypes[0]?.count || 1
                        const widthPct = (attack.count / maxCount) * 100
                        return (
                            <Box key={attack.type}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 600 }}>
                                        {attack.type}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#22D3EE', fontWeight: 700 }}>
                                        {attack.count}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: 8, borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                    <Box
                                        sx={{
                                            height: '100%',
                                            width: `${widthPct}%`,
                                            background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
                                            borderRadius: '4px',
                                            transition: 'width 0.5s ease'
                                        }}
                                    />
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Paper>

            {/* Active High-Risk Threats */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    backgroundColor: 'rgba(18, 17, 31, 0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(34, 211, 238, 0.15)',
                    borderRadius: '16px'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
                    <FiShield size={20} color="#EF4444" />
                    <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC' }}>
                        Active Critical Threats
                    </Typography>
                </Box>

                {highRiskEvents.length === 0 ? (
                    <Typography sx={{ color: '#94A3B8' }}>No critical threats currently detected.</Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {highRiskEvents.map((evt) => (
                            <Box
                                key={evt.id}
                                sx={{
                                    p: 2,
                                    borderRadius: '10px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.06)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box>
                                    <Typography sx={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>
                                        {evt.eventType}
                                    </Typography>
                                    <Typography sx={{ color: '#94A3B8', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                                        {evt.sourceIP} → {evt.destinationIP}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={evt.severity}
                                    size="small"
                                    sx={{
                                        backgroundColor: SEVERITY_COLORS.Critical.bg,
                                        color: SEVERITY_COLORS.Critical.main,
                                        border: `1px solid ${SEVERITY_COLORS.Critical.border}`,
                                        fontWeight: 800
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>
        </Box>
    )
}