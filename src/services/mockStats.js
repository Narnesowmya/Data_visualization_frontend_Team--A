// Temporary dummy data, shaped exactly like the future GET /stats response.
// Once backend delivers the real endpoint, we'll fetch this instead of importing it.

export const mockStats = {
  totalEvents: 1800,
  criticalThreats: 346,
  highSeverityAlerts: 573,
  vulnerabilities: 128,
  activeIncidents: 24,
  maliciousIpMatches: 37,
}