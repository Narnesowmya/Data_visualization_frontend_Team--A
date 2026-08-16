import React from 'react';
import { Grid } from '@mui/material';

import Person1AnomalyDistribution from '../../charts/person1/Person1AnomalyDistribution.jsx';
import Person1AnomalyTrend from '../../charts/person1/Person1AnomalyTrend.jsx';

export default function Person1AnomalyChart() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Person1AnomalyDistribution />
      </Grid>

      <Grid item xs={12} md={7}>
        <Person1AnomalyTrend />
      </Grid>
    </Grid>
  );
}