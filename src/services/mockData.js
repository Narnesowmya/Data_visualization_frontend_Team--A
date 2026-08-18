// Generate realistic mock security events dataset for SOC Threat Detection Dashboard

const EVENT_TYPES = [
  'Brute Force',
  'Malware',
  'Phishing',
  'Reconnaissance',
  'DDoS Attack',
  'SQL Injection',
  'Unauthorized Access',
  'Data Exfiltration'
];

const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];
const STATUSES = ['Open', 'Investigating', 'Resolved'];

const ASSETS = [
  'DB-Prod-Cluster-01',
  'Auth-Gateway-Primary',
  'VPN-Edge-Router-02',
  'K8s-Ingress-Controller',
  'Finance-App-Server',
  'HR-Portal-Web-01',
  'API-Gateway-Internal',
  'Domain-Controller-AD01',
  'Payment-Vault-Node',
  'Cloud-Storage-S3-Bucket'
];

const MOCK_IPS = [
  '185.220.101.5',
  '45.154.255.77',
  '194.26.29.112',
  '91.240.118.172',
  '103.251.170.8',
  '198.51.100.44',
  '192.168.1.105',
  '10.0.4.12',
  '172.16.45.89',
  '185.190.140.23',
  '46.101.12.88',
  '203.0.113.195'
];

const DESCRIPTIONS = {
  'Brute Force': 'Multiple failed SSH/RDP login attempts detected exceeding threshold (150+ attempts/min).',
  'Malware': 'Heuristic signature match for Cobalt Strike Beacon payload in temporary execution directory.',
  'Phishing': 'Credential harvesting domain communication detected via corporate email link click.',
  'Reconnaissance': 'Nmap port scan detected targeting sensitive internal subnets (Ports 22, 80, 443, 3389).',
  'DDoS Attack': 'High volume UDP flood traffic targeting external edge load balancer.',
  'SQL Injection': 'Malicious payload `UNION SELECT null, username, password FROM users` detected in HTTP POST body.',
  'Unauthorized Access': 'Lateral movement attempt using stolen Kerberos ticket from unmanaged host.',
  'Data Exfiltration': 'Anomalous outbound traffic surge (12.4 GB) to unknown external IP over port 8443.'
};

const RECOMMENDATIONS = {
  'Brute Force': 'Block source IP at firewall, enforce MFA, and reset compromised user credentials.',
  'Malware': 'Isolate affected host immediately via EDR, terminate malicious process, run full scan.',
  'Phishing': 'Revoke active user sessions, purge malicious email from inbox, reset corporate account credentials.',
  'Reconnaissance': 'Inspect firewall rules, rate-limit ICMP/TCP SYN requests, review exposed public endpoints.',
  'DDoS Attack': 'Enable Cloudflare/AWS Shield DDoS mitigation policy, drop spoofed traffic at border router.',
  'SQL Injection': 'Patch vulnerable API endpoint, enable WAF SQLi inspection rules, sanitize input params.',
  'Unauthorized Access': 'Invalidate Active Directory ticket-granting ticket (TGT), isolate infected domain machine.',
  'Data Exfiltration': 'Sever suspicious outbound network socket, review data loss prevention (DLP) logs.'
};

// Helper to generate a random date within the last N days
function getRandomDate(daysBack = 14) {
  const now = new Date();
  const past = new Date(now.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000);
  return past.toISOString();
}

// Generate 85 realistic mock events sorted by timestamp descending
export function generateMockEvents() {
  const events = [];
  
  for (let i = 1; i <= 85; i++) {
    const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
    let severity = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
    
    // Weight Critical & High slightly higher for realistic SOC view
    const rand = Math.random();
    if (rand < 0.25) severity = 'Critical';
    else if (rand < 0.55) severity = 'High';
    else if (rand < 0.80) severity = 'Medium';
    else severity = 'Low';

    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const sourceIP = MOCK_IPS[Math.floor(Math.random() * MOCK_IPS.length)];
    const destIP = '10.0.0.' + Math.floor(Math.random() * 200 + 10);
    const affectedAsset = ASSETS[Math.floor(Math.random() * ASSETS.length)];
    const timestamp = getRandomDate(14);
    
    let baseScore = severity === 'Critical' ? 90 : severity === 'High' ? 75 : severity === 'Medium' ? 50 : 25;
    const aiRiskScore = Math.min(99, Math.max(10, baseScore + Math.floor(Math.random() * 10 - 5)));

    events.push({
      id: `EVT-${2000 + i}`,
      timestamp,
      eventType: type,
      severity,
      sourceIP,
      destinationIP: destIP,
      status,
      affectedAsset,
      aiRiskScore,
      description: DESCRIPTIONS[type],
      recommendation: RECOMMENDATIONS[type]
    });
  }

  // Sort newest first
  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export const INITIAL_MOCK_EVENTS = generateMockEvents();
