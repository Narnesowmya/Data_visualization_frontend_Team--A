const secondaryCards = [
  {
    title: 'Total Events',
    value: stats?.totalEvents ?? 0,
    icon: FiActivity,
    color: {
      main: '#22D3EE',
      bg: 'rgba(34, 211, 238, 0.15)',
      border: 'rgba(34, 211, 238, 0.4)',
      glow: '0 0 15px rgba(34, 211, 238, 0.3)'
    },
    trend: 'up',
    trendValue: '+12%',
    subtitle: 'Total security events'
  },
  {
    title: 'Anomalies Detected',
    value: stats?.anomaliesDetected ?? 0,
    icon: FiAlertTriangle,
    color: SEVERITY_COLORS.High,
    trend: 'up',
    trendValue: '+8%',
    subtitle: 'Suspicious activity detected'
  },
  {
    title: 'Normal Events',
    value: stats?.normalEvents ?? 0,
    icon: FiShieldOff,
    color: SEVERITY_COLORS.Medium,
    trend: 'up',
    trendValue: '+3%',
    subtitle: 'Normal security activity'
  },
  {
    title: 'High-Risk Events',
    value: stats?.highRiskEvents ?? 0,
    icon: FiClock,
    color: {
      main: '#8B5CF6',
      bg: 'rgba(139, 92, 246, 0.15)',
      border: 'rgba(139, 92, 246, 0.4)',
      glow: '0 0 15px rgba(139, 92, 246, 0.3)'
    },
    trend: 'up',
    trendValue: '+5%',
    subtitle: 'High-risk threat events'
  }
];