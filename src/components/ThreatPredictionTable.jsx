import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

const threatData = [
  {
    threat: "Brute Force",
    prediction: "Attack",
    confidence: 95,
    severity: "High",
    status: "Detected",
  },
  {
    threat: "Phishing",
    prediction: "Attack",
    confidence: 88,
    severity: "High",
    status: "Detected",
  },
  {
    threat: "Malware",
    prediction: "Attack",
    confidence: 92,
    severity: "Critical",
    status: "Detected",
  },
  {
    threat: "Reconnaissance",
    prediction: "Suspicious",
    confidence: 76,
    severity: "Medium",
    status: "Monitoring",
  },
  {
    threat: "Normal Traffic",
    prediction: "Normal",
    confidence: 97,
    severity: "Low",
    status: "Safe",
  },
];

export default function ThreatPredictionTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: 700,
        }}
      >
        Threat Prediction Table
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Threat</strong></TableCell>
            <TableCell><strong>Prediction</strong></TableCell>
            <TableCell><strong>Confidence</strong></TableCell>
            <TableCell><strong>Severity</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {threatData.map((item) => (
            <TableRow key={item.threat}>
              <TableCell>{item.threat}</TableCell>

              <TableCell>{item.prediction}</TableCell>

              <TableCell>{item.confidence}%</TableCell>

              <TableCell>
                <Chip
                  label={item.severity}
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={item.status}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}