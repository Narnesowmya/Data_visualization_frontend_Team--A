import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { eventTrendData } from "./eventTrendData";

import "./EventTrendGraph.css";


function EventTrendGraph() {

  return (

    <div className="trend-card">

      <h2>Event Trend Graph</h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={eventTrendData}>

          <CartesianGrid />

          <XAxis 
            dataKey="time"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="events"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}


export default EventTrendGraph;