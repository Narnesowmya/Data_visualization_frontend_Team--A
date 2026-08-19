import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Alert,
  Snackbar,
  Paper
} from '@mui/material';
import { FiCpu } from 'react-icons/fi';

import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import KpiCards from '../components/KpiCards.jsx';
import Filters from '../components/Filters.jsx';
import EventTable from '../components/EventTable.jsx';
import EventDetailDrawer from '../components/EventDetailDrawer.jsx';

import ThreatDistributionChart from '../charts/ThreatDistributionChart.jsx';
import EventTrendChart from '../charts/EventTrendChart.jsx';
import TopAttackTypesChart from '../charts/TopAttackTypesChart.jsx';
import ConfidenceScoreChart from '../charts/ConfidenceScoreChart.jsx';

import NetworkTopologyBackground from '../components/NetworkTopologyBackground.jsx';

import {
  getEvents,
  getKpiStats,
  getAnalyticsData,
  updateEventStatus,
  simulateLiveAlert
} from '../services/api.js';

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

  // Data State
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
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

      setToastMessage(
        `Vigilon Incident ${eventId} status updated to ${newStatus}`
      );

      if (selectedEvent && selectedEvent.id === eventId) {
        setSelectedEvent((prev) => ({
          ...prev,
          status: newStatus
        }));
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

      setToastMessage(
        `🚨 VIGILON ALERT INJECTED: ${res.event.eventType} (${res.event.severity}) from ${res.event.sourceIP}`
      );

      fetchData();
    } catch (err) {
      console.error('Failed to simulate live alert:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const isOverviewTab =
    location.pathname === '/dashboard' ||
    location.pathname === '/dashboard/';

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0D0F1A',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {/* Animated Network Background */}
      <NetworkTopologyBackground />

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Workspace */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            md: `calc(100% - ${collapsed ? 80 : 270}px)`
          },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Navbar */}
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          onSimulateAlert={handleSimulateAlert}
          isSimulating={isSimulating}
        />

        {/* Dashboard Content */}
        <Box
          sx={{
            p: {
              xs: 1.5,
              sm: 2.5,
              md: 3
            },
            flexGrow: 1,
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {isOverviewTab ? (
            <Container
              maxWidth="xl"
              disableGutters
              sx={{
                width: '100%',
                maxWidth: '100%'
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  mb: {
                    xs: 2,
                    sm: 3
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Sora", sans-serif',
                      fontWeight: 800,
                      color: '#F8FAFC',
                      letterSpacing: '-0.02em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      fontSize: {
                        xs: '1.25rem',
                        sm: '1.5rem'
                      }
                    }}
                  >
                    Vigilon Threat Operations Center
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#94A3B8',
                      mt: 0.5,
                      fontSize: {
                        xs: '0.78rem',
                        sm: '0.875rem'
                      }
                    }}
                  >
                    AI-powered incident telemetry, real-time risk index
                    scoring, and automated threat triage stream.
                  </Typography>
                </Box>

                {/* Engine Active Status */}
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
                    gap: 1.5,
                    width: {
                      xs: '100%',
                      sm: 'auto'
                    },
                    boxSizing: 'border-box'
                  }}
                >
                  <FiCpu size={20} color="#22D3EE" />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#22D3EE',
                        fontWeight: 800,
                        display: 'block',
                        lineHeight: 1,
                        textTransform: 'uppercase'
                      }}
                    >
                      Vigilon AI Engine Active
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: '#94A3B8',
                        fontSize: '0.7rem'
                      }}
                    >
                      AI-Powered Threat Intelligence
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              {/* =====================================================
                  TASK 1: 5 KPI CARDS
                 ===================================================== */}
              <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                <KpiCards
                  stats={stats}
                  loading={loading}
                />
              </Box>

              {/* =====================================================
                  TASK 5: RESPONSIVE CHART + FILTER GRID
                 ===================================================== */}
              <Grid
                container
                spacing={{
                  xs: 2,
                  sm: 2.5,
                  md: 3
                }}
                sx={{
                  width: '100%',
                  m: 0
                }}
              >
                {/* 1. Event Trend Chart */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0,
                      height: '100%'
                    }}
                  >
                    <EventTrendChart
                      data={analytics?.eventTrend || []}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* 2. Threat Distribution */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      minWidth: 0
                    }}
                  >
                    <ThreatDistributionChart
                      data={analytics?.threatDistribution || null}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* 3. Top Attack Types */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      minWidth: 0
                    }}
                  >
                    <TopAttackTypesChart
                      data={analytics?.topAttackTypes || []}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* 4. Confidence Score */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0,
                      height: '100%'
                    }}
                  >
                    <ConfidenceScoreChart
                      data={analytics?.confidenceScore || []}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* Filters */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0
                    }}
                  >
                    <Filters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onResetFilters={handleResetFilters}
                    />
                  </Box>
                </Grid>

                {/* Event Table */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0,
                      overflowX: 'auto'
                    }}
                  >
                    <EventTable
                      events={events}
                      loading={loading}
                      onSelectEvent={handleSelectEvent}
                      onStatusChange={handleStatusChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          ) : (
            <Outlet
              context={{
                events,
                stats,
                analytics,
                loading,
                filters,
                handleFilterChange,
                handleResetFilters,
                handleSelectEvent,
                handleStatusChange
              }}
            />
          )}
        </Box>

        {/* Telemetry Detail Drawer */}
        <EventDetailDrawer
          open={drawerOpen}
          event={selectedEvent}
          onClose={() => setDrawerOpen(false)}
          onStatusChange={handleStatusChange}
        />

        {/* Toast Notification */}
        <Snackbar
          open={Boolean(toastMessage)}
          autoHideDuration={4000}
          onClose={() => setToastMessage('')}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
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
