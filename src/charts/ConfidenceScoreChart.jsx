import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const confidenceData = [
  { label: "Very Low", score: 20 },
  { label: "Low", score: 40 },
  { label: "Medium", score: 60 },
  { label: "High", score: 80 },
  { label: "Very High", score: 95 },
];

const ConfidenceScoreChart = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 350,
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Confidence Score</h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={confidenceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConfidenceScoreChart;