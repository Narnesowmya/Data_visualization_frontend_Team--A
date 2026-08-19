import { useState, useEffect } from 'react'
import { Box, Typography, Paper, CircularProgress } from '@mui/material'
import { FiBarChart2 } from 'react-icons/fi'
import { getAnalyticsData } from '../services/api.js'
import { SEVERITY_COLORS } from '../theme/socTheme.js'

export default function Analytics() {
    const [analytics, setAnalytics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getAnalyticsData()
            .then((data) => {
                setAnalytics(data)
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
                <Typography sx={{ color: '#F87171' }}>Failed to load analytics: {error}</Typography>
            </Box>
        )
    }

    const { threatDistribution, topAttackTypes, eventTrend } = analytics
    const totalThreats = Object.values(threatDistribution).reduce((sum, v) => sum + v, 0)
    const maxTrend = Math.max(...eventTrend.map((d) => d.count), 1)
    const maxAttack = topAttackTypes[0]?.count || 1

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                Analytics
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
                {/* Severity Distribution */}
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
                    <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', mb: 2.5 }}>
                        Threat Severity Distribution
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                        {Object.entries(threatDistribution).map(([severity, count]) => {
                            const style = SEVERITY_COLORS[severity] || SEVERITY_COLORS.Low
                            const pct = totalThreats > 0 ? (count / totalThreats) * 100 : 0
                            return (
                                <Box key={severity}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="body2" sx={{ color: style.main, fontWeight: 700 }}>
                                            {severity}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                            {count} ({pct.toFixed(0)}%)
                                        </Typography>
                                    </Box>
                                    <Box sx={{ height: 8, borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                        <Box sx={{ height: '100%', width: `${pct}%`, backgroundColor: style.main, borderRadius: '4px', transition: 'width 0.5s ease' }} />
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </Paper>

                {/* Top Attack Types */}
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
                    <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', mb: 2.5 }}>
                        Top Attack Types
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {topAttackTypes.slice(0, 6).map((attack) => {
                            const widthPct = (attack.count / maxAttack) * 100
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
                                        <Box sx={{ height: '100%', width: `${widthPct}%`, background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </Paper>
            </Box>

            {/* Event Trend */}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 3 }}>
                    <FiBarChart2 size={20} color="#22D3EE" />
                    <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC' }}>
                        Event Trend Over Time
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 180 }}>
                    {eventTrend.map((day) => {
                        const chartHeight = 130
                        const barHeight = Math.max((day.count / maxTrend) * chartHeight, 4)
                        return (
                            <Box key={day.date} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 1, height: '100%' }}>
                                <Typography variant="caption" sx={{ color: '#22D3EE', fontWeight: 700 }}>
                                    {day.count}
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: `${barHeight}px`,
                                        background: 'linear-gradient(180deg, #22D3EE, #8B5CF6)',
                                        borderRadius: '6px 6px 0 0',
                                        transition: 'height 0.5s ease'
                                    }}
                                />
                                <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.7rem' }}>
                                    {day.date}
                                </Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Paper>
        </Box>
    )
}