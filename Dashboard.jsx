import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container, Grid, Typography, Alert, Snackbar, Paper, Chip } from '@mui/material';
import { FiCpu, FiRadio, FiActivity } from 'react-icons/fi';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import KpiCards from '../components/KpiCards.jsx';
import Filters from '../components/Filters.jsx';
import EventTable from '../components/EventTable.jsx';
import EventDetailDrawer from '../components/EventDetailDrawer.jsx';
import ThreatDistributionChart from '../charts/ThreatDistributionChart.jsx';
import EventTrendChart from '../charts/EventTrendChart.jsx';
import TopAttackTypesChart from '../charts/TopAttackTypesChart.jsx';
import NetworkTopologyBackground from '../components/NetworkTopologyBackground.jsx';
import { getEvents, getKpiStats, getAnalyticsData, updateEventStatus, simulateLiveAlert } from '../services/api.js';

export default function Dashboard() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    severity: 'All',
    eventType: 'All',
    dateRange: 'All',
    searchIp: ''
  });

  // Data State derived from Axios API calls
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Detail Drawer & Simulation State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [eventsRes, statsRes, analyticsRes] = await Promise.all([
        getEvents(filters),
        getKpiStats(filters),
        getAnalyticsData(filters)
      ]);

      setEvents(eventsRes.events || []);
      setStats(statsRes.stats || null);
      setAnalytics(analyticsRes || null);
    } catch (err) {
      console.error('Failed fetching Vigilon telemetry data:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      severity: 'All',
      eventType: 'All',
      dateRange: 'All',
      searchIp: ''
    });
  };

  const handleSelectEvent = (evt) => {
    setSelectedEvent(evt);
    setDrawerOpen(true);
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await updateEventStatus(eventId, newStatus);
      setToastMessage(`Vigilon Incident ${eventId} status updated to ${newStatus}`);
      if (selectedEvent && selectedEvent.id === eventId) {
        setSelectedEvent(prev => ({ ...prev, status: newStatus }));
      }
      fetchData();
    } catch (err) {
      console.error('Failed to update event status:', err);
    }
  };

  const handleSimulateAlert = async () => {
    setIsSimulating(true);
    try {
      const res = await simulateLiveAlert();
      setToastMessage(`🚨 VIGILON ALERT INJECTED: ${res.event.eventType} (${res.event.severity}) from ${res.event.sourceIP}`);
      fetchData();
    } catch (err) {
      console.error('Failed to simulate live alert:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const isOverviewTab = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0D0F1A', position: 'relative', overflowX: 'hidden' }}>
      {/* VFX 1: Animated Particle Network Topology Canvas Background */}
      <NetworkTopologyBackground />

      {/* Persistent Fixed Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Command Workspace Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${collapsed ? 80 : 270}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Topbar with Vigilon Logo, Pulsing Status Indicator, & Profile */}
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          onSimulateAlert={handleSimulateAlert}
          isSimulating={isSimulating}
        />

        {/* Dashboard Content Container */}
        <Box sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
          {isOverviewTab ? (
            <Container maxWidth="xl" disableGutters>
              {/* Command Center Title Header Banner */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    Vigilon Threat Operations Center
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
                    AI-powered incident telemetry, real-time risk index scoring, and automated threat triage stream.
                  </Typography>
                </Box>

                {/* Engine Active Status Pill */}
                <Paper
                  elevation={0}
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: 'rgba(34, 211, 238, 0.08)',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <FiCpu size={20} color="#22D3EE" />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#22D3EE', fontWeight: 800, display: 'block', lineHeight: 1, textTransform: 'uppercase' }}>
                      Vigilon AI Engine Active
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.7rem' }}>
                      AI-Powered Threat Intelligence
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              {/* HERO ROW: Asymmetric KPI Layout (Spotlight Left ~40%, 2x2 Grid Right ~60%) */}
              <KpiCards stats={stats} loading={loading} />

              {/* MAIN 2-COLUMN WORKSPACE (~65% Left, ~35% Right with Clean Reflow) */}
              <Grid container spacing={3}>
                {/* Left Column (~65% Desktop): Trend Line Chart on top, Event Table below */}
                <Grid item xs={12} lg={8} sx={{ order: { xs: 2, lg: 1 } }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <EventTrendChart data={analytics?.eventTrend || []} loading={loading} />
                    <EventTable
                      events={events}
                      loading={loading}
                      onSelectEvent={handleSelectEvent}
                      onStatusChange={handleStatusChange}
                    />
                  </Box>
                </Grid>

                {/* Right Column (~35% Desktop): Sticky Collapsible Filters on top, Pie Chart middle, Bar Chart bottom */}
                <Grid item xs={12} lg={4} sx={{ order: { xs: 1, lg: 2 } }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Sticky Collapsible Filters Panel */}
                    <Filters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onResetFilters={handleResetFilters}
                    />

                    {/* Threat Severity Distribution Pie/Doughnut Chart */}
                    <ThreatDistributionChart data={analytics?.threatDistribution || null} loading={loading} />

                    {/* Top Attack Vectors Bar Chart */}
                    <TopAttackTypesChart data={analytics?.topAttackTypes || []} loading={loading} />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          ) : (
            <Outlet context={{ events, stats, analytics, loading, filters, handleFilterChange, handleResetFilters, handleSelectEvent, handleStatusChange }} />
          )}
        </Box>

        {/* Telemetry Detail Drawer */}
        <EventDetailDrawer
          open={drawerOpen}
          event={selectedEvent}
          onClose={() => setDrawerOpen(false)}
          onStatusChange={handleStatusChange}
        />

        {/* Toast Notification Snackbar */}
        <Snackbar
          open={Boolean(toastMessage)}
          autoHideDuration={4000}
          onClose={() => setToastMessage('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity="info"
            onClose={() => setToastMessage('')}
            sx={{
              backgroundColor: '#141326',
              color: '#F8FAFC',
              border: '1px solid #22D3EE',
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.3)'
            }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
