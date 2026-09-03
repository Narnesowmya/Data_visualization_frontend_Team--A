/**
 * ============================================================================
 * RISK API SERVICE - INCIDENT INVESTIGATION DATA ENGINE
 * ============================================================================
 * 
 * CONFIRMED SCHEMAS / ENUMS:
 * - status enum values: ['Open', 'Investigating', 'Resolved', 'False Positive'] (Confirmed by Backend)
 * 
 * PENDING TEAM CONFIRMATION:
 * The following items are subject to team/backend confirmation once the real
 * backend API contract is finalized:
 * 1. priority enum values: Currently using ['P1', 'P2', 'P3', 'P4']. Confirm against
 *    backend's actual priority enumeration (pending Backend 4/6 confirmation).
 * 2. related_events shape: Currently returning an array of related event objects.
 *    Confirm whether backend returns an array of objects, array of event IDs, or integer count (pending Backend 4/6 confirmation).
 * ============================================================================
 */

/**
 * Note on risk_factors:
 * These components match the Milestone 3 specification risk formula:
 * - Threat Severity: 25%
 * - ML Confidence: 25%
 * - Asset Criticality: 20%
 * - Vulnerability Exposure: 20%
 * - Threat Intelligence: 10%
 * Each factor value is normalized from 0 to 100.
 */

// Mock incident dataset adhering strictly to the agreed schema fields
const MOCK_INCIDENTS = [
  {
    incident_id: "INC-1001",
    security_intelligence: {
      "cve_id": "CVE-2024-30078",
      "cvss_score": 9.2,
      "vulnerability_status": "Open",
      "ioc_indicators": [
            {
                  "type": "IP",
                  "value": "185.220.101.5",
                  "status": "Malicious",
                  "threat_actor": "APT29 / Midnight Blizzard",
                  "confidence": "High"
            },
            {
                  "type": "Account",
                  "value": "root",
                  "status": "Targeted",
                  "threat_actor": "Unknown",
                  "confidence": "Medium"
            }
      ]
},
    
    threat_type: "Brute Force",
    risk_score: 88.5,
    risk_level: "Critical",
    priority: "P1",
    affected_asset: "DB-Prod-Cluster-01",
    ml_confidence: 94.2,
    risk_factors: {
      severity: 90,
      ml_confidence: 94,
      asset_criticality: 100,
      vulnerability: 85,
      threat_intelligence: 70
    },
    related_events: [
      {
        event_id: "EVT-2001",
        timestamp: "2026-08-29T10:15:30Z",
        source_ip: "185.220.101.5",
        description: "150+ failed SSH login attempts in 60s"
      },
      {
        event_id: "EVT-2002",
        timestamp: "2026-08-29T10:16:12Z",
        source_ip: "185.220.101.5",
        description: "Multiple root password guessing failures detected"
      }
    ],
    mitre_techniques: [
      "T1110.001 - Password Guessing",
      "T1078 - Valid Accounts"
    ],
    ioc_status: "Active",
    reasons: [
      "Anomalous spike in SSH authentication failures from unassigned IP 185.220.101.5",
      "Targeted account 'root' and 'admin' on core production database node"
    ],
    recommendations: [
      "Advisory: Block source IP 185.220.101.5 at edge perimeter firewall",
      "Advisory: Enforce multi-factor authentication for DB-Prod-Cluster-01 root access",
      "Advisory: Review and rotate compromised SSH credentials"
    ],
    status: "Investigating"
  },
  {
    incident_id: "INC-1002",
    security_intelligence: {
      "cve_id": "CVE-2024-21626",
      "cvss_score": 9.8,
      "vulnerability_status": "Open",
      "ioc_indicators": [
            {
                  "type": "IP",
                  "value": "45.154.255.77",
                  "status": "Malicious C2",
                  "threat_actor": "Wizard Spider",
                  "confidence": "High"
            },
            {
                  "type": "Hash (SHA256)",
                  "value": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                  "status": "Malicious",
                  "threat_actor": "Wizard Spider",
                  "confidence": "High"
            }
      ]
},
    
    threat_type: "Malware",
    risk_score: 92.0,
    risk_level: "Critical",
    priority: "P1",
    affected_asset: "Auth-Gateway-Primary",
    ml_confidence: 91.5,
    risk_factors: {
      severity: 95,
      ml_confidence: 92,
      asset_criticality: 95,
      vulnerability: 90,
      threat_intelligence: 85
    },
    related_events: [
      {
        event_id: "EVT-2003",
        timestamp: "2026-08-29T09:40:00Z",
        source_ip: "45.154.255.77",
        description: "Cobalt Strike Beacon heuristic signature match"
      }
    ],
    mitre_techniques: [
      "T1059.001 - PowerShell",
      "T1055 - Process Injection"
    ],
    ioc_status: "Active",
    reasons: [
      "Process execution pattern matched known C2 beacon profile",
      "Unsigned binary spawned from temp directory"
    ],
    recommendations: [
      "Advisory: Isolate host via EDR policy and terminate parent process",
      "Advisory: Collect memory dump for forensic analysis"
    ],
    status: "Open"
  },
  {
    incident_id: "INC-1003",
    security_intelligence: {
      "cve_id": "CVE-2023-48795",
      "cvss_score": 7.5,
      "vulnerability_status": "Under Review",
      "ioc_indicators": [
            {
                  "type": "IP",
                  "value": "194.26.29.112",
                  "status": "Suspicious",
                  "threat_actor": "Unknown",
                  "confidence": "Medium"
            }
      ]
},
    
    threat_type: "SQL Injection",
    risk_score: 76.4,
    risk_level: "High",
    priority: "P2",
    affected_asset: "HR-Portal-Web-01",
    ml_confidence: 88.9,
    risk_factors: {
      severity: 75,
      ml_confidence: 89,
      asset_criticality: 70,
      vulnerability: 75,
      threat_intelligence: 65
    },
    related_events: [
      {
        event_id: "EVT-2006",
        timestamp: "2026-08-29T08:22:15Z",
        source_ip: "194.26.29.112",
        description: "Malicious payload detected in HTTP POST parameters"
      }
    ],
    mitre_techniques: [
      "T1190 - Exploit Public-Facing Application"
    ],
    ioc_status: "Investigating",
    reasons: [
      "UNION SELECT query pattern detected in HTTP body request",
      "Multiple 500 internal server error responses triggered"
    ],
    recommendations: [
      "Advisory: Update WAF rule set to inspect and drop SQLi signatures",
      "Advisory: Parameterize queries on vulnerable HR-Portal endpoint"
    ],
    status: "Investigating"
  },
  {
    incident_id: "INC-1004",
    security_intelligence: {
      "cve_id": "CVE-2024-38077",
      "cvss_score": 8.4,
      "vulnerability_status": "Active Exploitation",
      "ioc_indicators": [
            {
                  "type": "IP",
                  "value": "103.251.170.8",
                  "status": "Malicious Egress",
                  "threat_actor": "Lazarus Group",
                  "confidence": "High"
            }
      ]
},
    
    threat_type: "Data Exfiltration",
    risk_score: 84.1,
    risk_level: "High",
    priority: "P2",
    affected_asset: "Cloud-Storage-S3-Bucket",
    ml_confidence: 96.0,
    risk_factors: {
      severity: 85,
      ml_confidence: 96,
      asset_criticality: 80,
      vulnerability: 80,
      threat_intelligence: 75
    },
    related_events: [
      {
        event_id: "EVT-2008",
        timestamp: "2026-08-29T07:11:05Z",
        source_ip: "103.251.170.8",
        description: "Anomalous 12.4 GB outbound network transfer over non-standard port"
      }
    ],
    mitre_techniques: [
      "T1048 - Exfiltration Over Alternative Protocol"
    ],
    ioc_status: "Active",
    reasons: [
      "Egress data transfer 400% above historical baseline",
      "Outbound connection directed to low-reputation IP in unassigned ASN"
    ],
    recommendations: [
      "Advisory: Temporarily block outbound connection on port 8443",
      "Advisory: Perform audit on S3 bucket access policies"
    ],
    status: "Open"
  },
  {
    incident_id: "INC-1005",
    security_intelligence: {
      "cve_id": "CVE-2023-38831",
      "cvss_score": 5.3,
      "vulnerability_status": "Mitigated",
      "ioc_indicators": [
            {
                  "type": "Domain",
                  "value": "auth-update-verify.com",
                  "status": "Phishing",
                  "threat_actor": "FIN7",
                  "confidence": "High"
            },
            {
                  "type": "IP",
                  "value": "198.51.100.44",
                  "status": "Suspicious",
                  "threat_actor": "FIN7",
                  "confidence": "Low"
            }
      ]
},
    
    threat_type: "Phishing",
    risk_score: 45.0,
    risk_level: "Medium",
    priority: "P3",
    affected_asset: "API-Gateway-Internal",
    ml_confidence: 79.5,
    risk_factors: {
      severity: 45,
      ml_confidence: 80,
      asset_criticality: 30,
      vulnerability: 35,
      threat_intelligence: 25
    },
    related_events: [
      {
        event_id: "EVT-2010",
        timestamp: "2026-08-29T06:05:40Z",
        source_ip: "198.51.100.44",
        description: "Suspicious link click detected in user inbox log"
      }
    ],
    mitre_techniques: [
      "T1566.002 - Spearphishing Link"
    ],
    ioc_status: "Remediated",
    reasons: [
      "User clicked credential harvesting link in external email",
      "No secondary authentication token submission detected"
    ],
    recommendations: [
      "Advisory: Purge malicious email from organization mailboxes",
      "Advisory: Reset user corporate single sign-on credentials"
    ],
    status: "Resolved"
  }
];

/**
 * Fetch all security incidents with optional filtering.
 * 
 * @param {Object} [filters={}] - Filter criteria (e.g. { status, risk_level })
 * @returns {Promise<Array>} List of incident objects matching exact team schema
 */
export async function getIncidents(filters = {}) {
  // Simulate asynchronous network latency
  await new Promise((resolve) => setTimeout(resolve, 150));

  let results = [...MOCK_INCIDENTS];

  if (filters.status) {
    results = results.filter((inc) => inc.status.toLowerCase() === filters.status.toLowerCase());
  }

  if (filters.risk_level) {
    results = results.filter((inc) => inc.risk_level.toLowerCase() === filters.risk_level.toLowerCase());
  }

  return results;
}

/**
 * Fetch a single incident by its unique ID.
 * 
 * @param {string} incident_id - Unique incident identifier (e.g. "INC-1001")
 * @returns {Promise<Object|null>} Incident object matching exact team schema or null if not found
 */
export async function getIncidentById(incident_id) {
  // Simulate asynchronous network latency
  await new Promise((resolve) => setTimeout(resolve, 100));

  const incident = MOCK_INCIDENTS.find((inc) => inc.incident_id === incident_id);
  return incident ? { ...incident } : null;
}
