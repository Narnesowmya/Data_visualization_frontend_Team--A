import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  FiArrowLeft,
  FiAlertTriangle,
  FiShield,
  FiCheckCircle,
  FiInfo,
  FiActivity,
  FiCpu,
  FiServer,
  FiLock,
  FiTag,
  FiBarChart2,
  FiDatabase
} from 'react-icons/fi';
import { getIncidentById } from '../services/riskApi.js';

// 5-Tier Color Scheme for Risk Levels
const RISK_LEVEL_COLORS = {
  Critical: {
    main: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.5)',
    glow: '0 0 16px rgba(239, 68, 68, 0.35)'
  },
  High: {
    main: '#F97316',
    bg: 'rgba(249, 115, 22, 0.15)',
    border: 'rgba(249, 115, 22, 0.5)',
    glow: '0 0 16px rgba(249, 115, 22, 0.35)'
  },
  Moderate: {
    main: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.5)',
    glow: '0 0 16px rgba(245, 158, 11, 0.35)'
  },
  Medium: {
    main: '#22D3EE',
    bg: 'rgba(34, 211, 238, 0.15)',
    border: 'rgba(34, 211, 238, 0.5)',
    glow: '0 0 16px rgba(34, 211, 238, 0.35)'
  },
  Low: {
    main: '#10B981',
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.5)',
    glow: '0 0 16px rgba(16, 185, 129, 0.35)'
  }
};

const STATUS_BADGES = {
  Open: { main: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)' },
  'Under Investigation': { main: '#22D3EE', bg: 'rgba(34, 211, 238, 0.15)', border: 'rgba(34, 211, 238, 0.4)' },
  Investigating: { main: '#22D3EE', bg: 'rgba(34, 211, 238, 0.15)', border: 'rgba(34, 211, 238, 0.4)' },
  Resolved: { main: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)' },
  Closed: { main: '#64748B', bg: 'rgba(100, 116, 139, 0.15)', border: 'rgba(100, 116, 139, 0.4)' },
  'False Positive': { main: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)' }
};

const PRIORITY_BADGES = {
  P1: { main: '#EF4444', bg: 'rgba(239, 68, 68, 0.2)', border: 'rgba(239, 68, 68, 0.6)' },
  P2: { main: '#F97316', bg: 'rgba(249, 115, 22, 0.2)', border: 'rgba(249, 115, 22, 0.6)' },
  P3: { main: '#FBBF24', bg: 'rgba(251, 191, 36, 0.2)', border: 'rgba(251, 191, 36, 0.6)' },
  P4: { main: '#10B981', bg: 'rgba(16, 185, 129, 0.2)', border: 'rgba(16, 185, 129, 0.6)' }
};

const FACTOR_DEFINITIONS = [
  { key: 'severity', label: 'Threat Severity', weight: '25%', color: '#EF4444' },
  { key: 'ml_confidence', label: 'ML Confidence', weight: '25%', color: '#8B5CF6' },
  { key: 'asset_criticality', label: 'Asset Criticality', weight: '20%', color: '#22D3EE' },
  { key: 'vulnerability', label: 'Vulnerability Exposure', weight: '20%', color: '#F97316' },
  { key: 'threat_intelligence', label: 'Threat Intelligence', weight: '10%', color: '#10B981' }
];

const getCvssSeverity = (score) => {
  if (score == null) return { label: 'Unknown', style: RISK_LEVEL_COLORS.Medium };
  if (score >= 9.0) return { label: 'Critical', style: RISK_LEVEL_COLORS.Critical };
  if (score >= 7.0) return { label: 'High', style: RISK_LEVEL_COLORS.High };
  if (score >= 4.0) return { label: 'Medium', style: RISK_LEVEL_COLORS.Medium };
  return { label: 'Low', style: RISK_LEVEL_COLORS.Low };
};

export default function IncidentInvestigation() {
  const { incidentId } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    setLoading(true);
    getIncidentById(incidentId)
      .then((data) => {
        if (data && data.incident_id) {
          setIncident(data);
          setError(null);
        } else {
          setError(`Incident '${incidentId}' was not found.`);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load incident details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [incidentId]);

  if (loading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: '#22D3EE' }} />
      </Box>
    );
  }

  if (error || !incident) {
    return (
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Button
          startIcon={<FiArrowLeft />}
          onClick={handleBack}
          sx={{ color: '#94A3B8', mb: 3, '&:hover': { color: '#22D3EE' } }}
        >
          Back
        </Button>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(18, 17, 31, 0.75)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px'
          }}
        >
          <FiAlertTriangle size={48} color="#EF4444" style={{ marginBottom: '16px' }} />
          <Typography variant="h5" sx={{ color: '#F8FAFC', fontWeight: 700, mb: 1 }}>
            Incident Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            {error || 'The requested incident record could not be retrieved.'}
          </Typography>
        </Paper>
      </Box>
    );
  }

  const riskStyle = RISK_LEVEL_COLORS[incident.risk_level] || RISK_LEVEL_COLORS.Medium;
  const statusStyle = STATUS_BADGES[incident.status] || STATUS_BADGES.Investigating;
  const priorityStyle = PRIORITY_BADGES[incident.priority] || PRIORITY_BADGES.P2;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Back Button */}
      <Button
        startIcon={<FiArrowLeft />}
        onClick={handleBack}
        sx={{
          color: '#94A3B8',
          mb: 3,
          fontFamily: '"Sora", sans-serif',
          fontWeight: 600,
          '&:hover': { color: '#22D3EE', backgroundColor: 'rgba(34, 211, 238, 0.1)' }
        }}
      >
        Back
      </Button>

      {/* Main Glassmorphic Container */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: '20px',
          backgroundColor: 'rgba(18, 17, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(34, 211, 238, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Section 1: Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            mb: 3
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#F8FAFC',
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                {incident.incident_id}
              </Typography>
              <Chip
                label={incident.priority || 'P2'}
                size="small"
                sx={{
                  backgroundColor: priorityStyle.bg,
                  color: priorityStyle.main,
                  border: `1px solid ${priorityStyle.border}`,
                  fontWeight: 800,
                  fontSize: '0.75rem'
                }}
              />
              <Chip
                label={incident.status || 'Investigating'}
                size="small"
                sx={{
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.main,
                  border: `1px solid ${statusStyle.border}`,
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#22D3EE', fontWeight: 700 }}>
              {incident.threat_type || 'Unknown Threat'}
            </Typography>
          </Box>

          {/* Header Right: Risk Score Prominent Display */}
          <Paper
            elevation={0}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: '14px',
              backgroundColor: riskStyle.bg,
              border: `1px solid ${riskStyle.border}`,
              boxShadow: riskStyle.glow,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Risk Score
              </Typography>
              <Typography variant="h5" sx={{ color: riskStyle.main, fontWeight: 800, fontFamily: '"Sora", sans-serif' }}>
                {typeof incident.risk_score === 'number' ? incident.risk_score.toFixed(1) : incident.risk_score} <Typography component="span" variant="body2" sx={{ color: '#94A3B8' }}>/ 100</Typography>
              </Typography>
            </Box>
            <Chip
              label={incident.risk_level || 'Medium'}
              size="small"
              sx={{
                backgroundColor: 'rgba(13, 15, 26, 0.6)',
                color: riskStyle.main,
                border: `1px solid ${riskStyle.border}`,
                fontWeight: 800,
                fontSize: '0.72rem'
              }}
            />
          </Paper>
        </Box>

        <Divider sx={{ borderColor: 'rgba(34, 211, 238, 0.12)', my: 3 }} />

        {/* Section 2: Key Details Grid */}
        <Typography
          variant="subtitle2"
          sx={{ color: '#94A3B8', mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}
        >
          Key Technical Attributes
        </Typography>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {/* Affected Asset */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, borderRadius: '12px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.8, fontWeight: 600 }}>
                Affected Asset
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FiServer size={18} color="#22D3EE" />
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#F8FAFC' }}>
                  {incident.affected_asset || 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* ML Confidence */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, borderRadius: '12px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.8, fontWeight: 600 }}>
                ML Confidence
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FiCpu size={18} color="#8B5CF6" />
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#8B5CF6' }}>
                  {incident.ml_confidence != null ? `${incident.ml_confidence}%` : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* IOC Status */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, borderRadius: '12px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.8, fontWeight: 600 }}>
                IOC Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FiLock size={18} color="#F97316" />
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#F97316' }}>
                  {incident.ioc_status || 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* MITRE Techniques */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, borderRadius: '12px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.8, fontWeight: 600 }}>
                MITRE ATT&CK Techniques
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {Array.isArray(incident.mitre_techniques) && incident.mitre_techniques.length > 0 ? (
                  incident.mitre_techniques.map((tech, idx) => (
                    <Chip
                      key={idx}
                      label={tech}
                      size="small"
                      icon={<FiTag size={12} />}
                      sx={{
                        backgroundColor: 'rgba(34, 211, 238, 0.1)',
                        color: '#22D3EE',
                        border: '1px solid rgba(34, 211, 238, 0.3)',
                        fontSize: '0.72rem',
                        fontWeight: 600
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#64748B' }}>None Specified</Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Section 2.5: Security Intelligence Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FiShield color="#22D3EE" size={20} />
            <Typography variant="subtitle2" sx={{ color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Security Intelligence
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(13, 15, 26, 0.6)',
              border: '1px solid rgba(34, 211, 238, 0.15)'
            }}
          >
            {/* Top Grid: CVE, CVSS Score, Vulnerability Status, Affected Asset Reference */}
            <Grid container spacing={2.5} sx={{ mb: 3 }}>
              {/* CVE ID */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(18, 17, 31, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.8, fontWeight: 600 }}>
                    CVE ID
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FiDatabase size={18} color="#22D3EE" />
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#22D3EE', fontFamily: 'monospace' }}>
                      {incident.security_intelligence?.cve_id || 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* CVSS Score with color-coded severity treatment */}
              <Grid item xs={12} sm={6} md={3}>
                {(() => {
                  const cvssScore = incident.security_intelligence?.cvss_score;
                  const { label: cvssSeverityLabel, style: cvssStyle } = getCvssSeverity(cvssScore);
                  return (
                    <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(18, 17, 31, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.8, fontWeight: 600 }}>
                        CVSS Score
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: cvssStyle.main, fontFamily: '"Sora", sans-serif' }}>
                          {typeof cvssScore === 'number' ? cvssScore.toFixed(1) : 'N/A'}
                        </Typography>
                        {cvssScore != null && (
                          <Chip
                            label={cvssSeverityLabel}
                            size="small"
                            sx={{
                              backgroundColor: cvssStyle.bg,
                              color: cvssStyle.main,
                              border: `1px solid ${cvssStyle.border}`,
                              fontWeight: 800,
                              fontSize: '0.72rem'
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  );
                })()}
              </Grid>

              {/* Vulnerability Status */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(18, 17, 31, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.8, fontWeight: 600 }}>
                    Vulnerability Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={incident.security_intelligence?.vulnerability_status || 'N/A'}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        color: '#EF4444',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        fontWeight: 700,
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Affected Asset Reference */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(18, 17, 31, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.8, fontWeight: 600 }}>
                    Affected Asset
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                    {incident.affected_asset || 'N/A'}{' '}
                    <Typography component="span" variant="caption" sx={{ color: '#64748B', display: 'inline', fontStyle: 'italic' }}>
                      (Covered in Key Attributes)
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Bottom: IOC Indicators Table */}
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 1.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              IOC Indicators ({incident.security_intelligence?.ioc_indicators ? incident.security_intelligence.ioc_indicators.length : 0})
            </Typography>

            {Array.isArray(incident.security_intelligence?.ioc_indicators) && incident.security_intelligence.ioc_indicators.length > 0 ? (
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  backgroundColor: 'rgba(18, 17, 31, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px'
                }}
              >
                <Table size="small">
                  <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                    <TableRow>
                      <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Type</TableCell>
                      <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Value</TableCell>
                      <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Status</TableCell>
                      <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Threat Actor</TableCell>
                      <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Confidence</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incident.security_intelligence.ioc_indicators.map((ioc, idx) => (
                      <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ color: '#22D3EE', fontWeight: 700, fontSize: '0.82rem', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                          {ioc.type || 'N/A'}
                        </TableCell>
                        <TableCell sx={{ color: '#F8FAFC', fontFamily: 'monospace', fontSize: '0.85rem', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                          {ioc.value || 'N/A'}
                        </TableCell>
                        <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                          <Chip
                            label={ioc.status || 'Unknown'}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(239, 68, 68, 0.15)',
                              color: '#EF4444',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#94A3B8', fontSize: '0.85rem', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                          {ioc.threat_actor || 'Unknown'}
                        </TableCell>
                        <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                          <Chip
                            label={ioc.confidence || 'Medium'}
                            size="small"
                            sx={{
                              backgroundColor: ioc.confidence === 'High'
                                ? 'rgba(239, 68, 68, 0.15)' : ioc.confidence === 'Medium'
                                ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                              color: ioc.confidence === 'High'
                                ? '#EF4444' : ioc.confidence === 'Medium'
                                ? '#F59E0B' : '#10B981',
                              border: `1px solid ${ioc.confidence === 'High'
                                ? 'rgba(239, 68, 68, 0.4)' : ioc.confidence === 'Medium'
                                ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ p: 2, borderRadius: '8px', backgroundColor: 'rgba(18, 17, 31, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="body2" sx={{ color: '#64748B' }}>No IOC indicators recorded for this incident.</Typography>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Section 3: "Why is this high risk?" Explainability Panel */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FiCpu color="#22D3EE" size={20} />
            <Typography variant="subtitle2" sx={{ color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Why is this high risk? (AI Explainability)
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(13, 15, 26, 0.6)',
              border: '1px solid rgba(34, 211, 238, 0.15)'
            }}
          >
            {Array.isArray(incident.reasons) && incident.reasons.length > 0 ? (
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {incident.reasons.map((reason, idx) => (
                  <Box
                    component="li"
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      mb: idx === incident.reasons.length - 1 ? 0 : 1.5
                    }}
                  >
                    <FiCheckCircle size={18} color="#22D3EE" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: '#F8FAFC', fontWeight: 500 }}>
                      {reason}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: '#64748B' }}>No diagnostic reasons provided.</Typography>
            )}
          </Paper>
        </Box>

        {/* Section 3.5: Risk Score Breakdown */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FiBarChart2 color="#8B5CF6" size={20} />
            <Typography variant="subtitle2" sx={{ color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Risk Score Breakdown
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(13, 15, 26, 0.6)',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {FACTOR_DEFINITIONS.map((factor) => {
                const value = incident.risk_factors ? incident.risk_factors[factor.key] ?? 0 : 0;
                return (
                  <Box key={factor.key}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                      <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                        {factor.label}{' '}
                        <Typography component="span" variant="caption" sx={{ color: '#94A3B8', ml: 0.5, fontWeight: 500 }}>
                          ({factor.weight} weight)
                        </Typography>
                      </Typography>
                      <Typography variant="body2" sx={{ color: factor.color, fontWeight: 700, fontFamily: 'monospace' }}>
                        {value} / 100
                      </Typography>
                    </Box>
                    <Box sx={{ height: 8, borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.06)', overflow: 'hidden' }}>
                      <Box
                        sx={{
                          height: '100%',
                          width: `${Math.min(100, Math.max(0, value))}%`,
                          backgroundColor: factor.color,
                          borderRadius: '4px',
                          transition: 'width 0.5s ease',
                          boxShadow: `0 0 10px ${factor.color}66`
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Box>

        {/* Section 4: Related Events Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FiActivity color="#8B5CF6" size={20} />
            <Typography variant="subtitle2" sx={{ color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Related Events ({incident.related_events ? incident.related_events.length : 0})
            </Typography>
          </Box>
          {Array.isArray(incident.related_events) && incident.related_events.length > 0 ? (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                backgroundColor: 'rgba(13, 15, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px'
              }}
            >
              <Table size="small">
                <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Event ID</TableCell>
                    <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Timestamp</TableCell>
                    <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Source IP</TableCell>
                    <TableCell sx={{ color: '#64748B', fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.08)' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incident.related_events.map((evt, idx) => (
                    <TableRow key={evt.event_id || idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ color: '#22D3EE', fontWeight: 700, fontFamily: 'monospace', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                        {evt.event_id || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ color: '#94A3B8', fontSize: '0.82rem', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                        {evt.timestamp ? new Date(evt.timestamp).toLocaleString() : 'N/A'}
                      </TableCell>
                      <TableCell sx={{ color: '#F8FAFC', fontFamily: 'monospace', fontSize: '0.85rem', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                        {evt.source_ip || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ color: '#F8FAFC', fontSize: '0.88rem', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                        {evt.description || 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper
              elevation={0}
              sx={{ p: 2.5, borderRadius: '12px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              <Typography variant="body2" sx={{ color: '#64748B' }}>No related events recorded.</Typography>
            </Paper>
          )}
        </Box>

        {/* Section 5: Advisory Recommendations Panel */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FiInfo color="#F97316" size={20} />
            <Typography variant="subtitle2" sx={{ color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Advisory Recommendations
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(13, 15, 26, 0.6)',
              border: '1px solid rgba(249, 115, 22, 0.2)'
            }}
          >
            {Array.isArray(incident.recommendations) && incident.recommendations.length > 0 ? (
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {incident.recommendations.map((rec, idx) => (
                  <Box
                    component="li"
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      mb: idx === incident.recommendations.length - 1 ? 0 : 1.5
                    }}
                  >
                    <FiShield size={18} color="#F97316" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <Typography variant="body1" sx={{ color: '#F8FAFC', fontWeight: 500 }}>
                      {rec}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: '#64748B' }}>No recommendations available.</Typography>
            )}
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
}
