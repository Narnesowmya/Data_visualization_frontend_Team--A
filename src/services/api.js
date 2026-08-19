import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { INITIAL_MOCK_EVENTS, INITIAL_MOCK_VULNERABILITIES } from './mockData.js'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const USE_MOCK = !API_BASE_URL;

// Create a central Axios client
export const apiClient = axios.create({
  baseURL: USE_MOCK ? '/api' : API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    ...(USE_MOCK ? {} : { 'x-api-key': API_KEY }) // confirm header name with backend
  }
});

// Only attach the mock adapter when there's no real backend URL yet
let mock = null;
if (USE_MOCK) {
  mock = new AxiosMockAdapter(apiClient, { delayResponse: 150 });

  // In-memory data store for live status updates/simulated live alerts
  let mockEventsDatabase = [...INITIAL_MOCK_EVENTS];

  // Helper to filter events based on request parameters
  function filterEvents(events, params = {}) {
    const { severity, eventType, searchIp, dateRange } = params;

    return events.filter(evt => {
      if (severity && severity !== 'All') {
        if (evt.severity.toLowerCase() !== severity.toLowerCase()) return false;
      }

      if (eventType && eventType !== 'All') {
        if (evt.eventType.toLowerCase() !== eventType.toLowerCase()) return false;
      }

      if (searchIp && searchIp.trim() !== '') {
        const term = searchIp.trim().toLowerCase();
        const ipMatch = evt.sourceIP.toLowerCase().includes(term) || evt.destinationIP.toLowerCase().includes(term);
        const assetMatch = evt.affectedAsset.toLowerCase().includes(term);
        const idMatch = evt.id.toLowerCase().includes(term);
        if (!ipMatch && !assetMatch && !idMatch) return false;
      }

      if (dateRange && dateRange !== 'All') {
        const eventTime = new Date(evt.timestamp).getTime();
        const now = new Date().getTime();

        if (dateRange === '24h') {
          if (now - eventTime > 24 * 60 * 60 * 1000) return false;
        } else if (dateRange === '7d') {
          if (now - eventTime > 7 * 24 * 60 * 60 * 1000) return false;
        } else if (dateRange === '30d') {
          if (now - eventTime > 30 * 24 * 60 * 60 * 1000) return false;
        }
      }

      return true;
    });
  }

  mock.onGet('/events').reply(config => {
    const filtered = filterEvents(mockEventsDatabase, config.params);
    return [200, { success: true, count: filtered.length, events: filtered }];
  });

  mock.onGet('/kpi-stats').reply(config => {
    const filtered = filterEvents(mockEventsDatabase, config.params);
    const stats = {
      totalEvents: filtered.length,
      criticalThreats: filtered.filter(e => e.severity === 'Critical').length,
      highSeverityAlerts: filtered.filter(e => e.severity === 'High').length,
      vulnerabilities: filtered.filter(e => e.severity === 'Medium').length + Math.floor(filtered.length * 0.4),
      activeIncidents: filtered.filter(e => e.status === 'Open' || e.status === 'Investigating').length
    };
    return [200, { success: true, stats }];
  });

  mock.onGet('/analytics').reply(config => {
    const filtered = filterEvents(mockEventsDatabase, config.params);

    const threatDistribution = {
      Critical: filtered.filter(e => e.severity === 'Critical').length,
      High: filtered.filter(e => e.severity === 'High').length,
      Medium: filtered.filter(e => e.severity === 'Medium').length,
      Low: filtered.filter(e => e.severity === 'Low').length
    };

    const attackCounts = {};
    filtered.forEach(e => {
      attackCounts[e.eventType] = (attackCounts[e.eventType] || 0) + 1;
    });

    const topAttackTypes = Object.keys(attackCounts)
      .map(type => ({ type, count: attackCounts[type] }))
      .sort((a, b) => b.count - a.count);

    const trendMap = {};
    filtered.forEach(e => {
      const dateStr = new Date(e.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      trendMap[dateStr] = (trendMap[dateStr] || 0) + 1;
    });

    const eventTrend = Object.keys(trendMap).map(date => ({
      date,
      count: trendMap[date]
    })).reverse();

    return [200, { success: true, threatDistribution, topAttackTypes, eventTrend }];
  })
  3
  mock.onGet('/vulnerabilities').reply(() => {
    return [200, { success: true, count: INITIAL_MOCK_VULNERABILITIES.length, vulnerabilities: INITIAL_MOCK_VULNERABILITIES }]
  });



  mock.onPatch(/\/events\/.+/).reply(config => {
    const eventId = config.url.split('/').pop();
    const { status } = JSON.parse(config.data || '{}');

    const idx = mockEventsDatabase.findIndex(e => e.id === eventId);
    if (idx !== -1) {
      mockEventsDatabase[idx].status = status;
      return [200, { success: true, event: mockEventsDatabase[idx] }];
    }
    return [404, { success: false, message: 'Event not found' }];
  });

  mock.onPost('/events/simulate').reply(() => {
    const severities = ['Critical', 'High', 'Medium'];
    const types = ['Brute Force', 'Malware', 'SQL Injection', 'DDoS Attack', 'Data Exfiltration'];
    const newEvt = {
      id: `EVT-${3000 + Math.floor(Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      eventType: types[Math.floor(Math.random() * types.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      sourceIP: `185.220.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      destinationIP: '10.0.1.88',
      status: 'Open',
      affectedAsset: 'Auth-Gateway-Primary',
      aiRiskScore: 92,
      description: 'Simulated real-time automated intrusion event detected by SentinelAI engine.',
      recommendation: 'Immediate SOC Analyst triage recommended.'
    };

    mockEventsDatabase.unshift(newEvt);
    return [201, { success: true, event: newEvt }];
  });
}

// -------------------------------------------------------------
// PUBLIC API SERVICE METHODS (Callable by components via Axios)
// -------------------------------------------------------------

export const getEvents = async (filters = {}) => {
  const response = await apiClient.get('/events', { params: filters });
  return response.data;
};

export const getKpiStats = async (filters = {}) => {
  const response = await apiClient.get('/kpi-stats', { params: filters });
  return response.data;
};

export const getAnalyticsData = async (filters = {}) => {
  const response = await apiClient.get('/analytics', { params: filters });
  return response.data;
};

export const updateEventStatus = async (eventId, newStatus) => {
  const response = await apiClient.patch(`/events/${eventId}`, { status: newStatus });
  return response.data;
};

export const simulateLiveAlert = async () => {
  const response = await apiClient.post('/events/simulate');
  return response.data;
};
export const getVulnerabilities = async () => {
  const response = await apiClient.get('/vulnerabilities')
  return response.data
}