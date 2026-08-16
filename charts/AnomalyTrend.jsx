import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mon", anomalies: 12 },
  { date: "Tue", anomalies: 18 },
  { date: "Wed", anomalies: 10 },
  { date: "Thu", anomalies: 25 },
  { date: "Fri", anomalies: 15 },
  { date: "Sat", anomalies: 22 },
  { date: "Sun", anomalies: 17 },
];

function AnomalyTrend() {
  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>
        Anomaly Trend
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="anomalies"
            name="Anomalies"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnomalyTrend;