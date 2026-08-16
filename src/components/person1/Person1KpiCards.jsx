import React from 'react';
import { Grid } from '@mui/material';
import {
  FiAlertTriangle,
  FiShield,
  FiActivity,
  FiTarget
} from 'react-icons/fi';

import Person1KpiCard from './Person1KpiCard.jsx';

export default function Person1KpiCards({ stats = {} }) {
  const totalThreats = stats.totalThreats ?? 128;
  const criticalThreats = stats.criticalThreats ?? 24;
  const activeIncidents = stats.activeIncidents ?? 17;
  const detectionRate = stats.detectionRate ?? 94;

  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} lg={3}>
        <Person1KpiCard
          title="Total Threats"
          value={totalThreats}
          subtitle="Detected events"
          trend="+12%"
          color="#22D3EE"
          icon={<FiShield size={23} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <Person1KpiCard
          title="Critical Threats"
          value={criticalThreats}
          subtitle="Requires attention"
          trend="+8%"
          color="#EF4444"
          icon={<FiAlertTriangle size={23} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <Person1KpiCard
          title="Active Incidents"
          value={activeIncidents}
          subtitle="Currently active"
          trend="+5%"
          color="#F59E0B"
          icon={<FiActivity size={23} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <Person1KpiCard
          title="Detection Rate"
          value={`${detectionRate}%`}
          subtitle="AI detection accuracy"
          trend="+3%"
          color="#22C55E"
          icon={<FiTarget size={23} />}
        />
      </Grid>
    </Grid>
  );
}