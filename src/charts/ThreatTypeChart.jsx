import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const threatTypeData = [
  { type: "Brute Force", count: 45 },
  { type: "Malware", count: 35 },
  { type: "Phishing", count: 30 },
  { type: "Reconnaissance", count: 20 },
];

export default function ThreatTypeChart() {
  return (
    <div
      style={{
        width: "100%",
        height: 350,
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
        marginTop: "24px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Threat-Type Distribution</h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={threatTypeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}