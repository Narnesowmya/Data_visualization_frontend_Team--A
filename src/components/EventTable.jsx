import "./EventTable.css";

function EventTable() {
  const events = [
    {
      time: "10:30 AM",
      eventType: "Failed Login",
      severity: "High",
      sourceIP: "192.168.1.10",
      status: "Open",
    },
    {
      time: "11:15 AM",
      eventType: "Malware",
      severity: "Critical",
      sourceIP: "10.0.0.5",
      status: "Investigating",
    },
    {
      time: "12:00 PM",
      eventType: "Phishing",
      severity: "Medium",
      sourceIP: "172.16.0.25",
      status: "Resolved",
    },
    {
      time: "01:30 PM",
      eventType: "Unauthorized Access",
      severity: "Low",
      sourceIP: "192.168.0.15",
      status: "Open",
    },
  ];

  return (
    <div className="table-container">
      <h2 className="table-title">Security Event Table</h2>

      <table className="event-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Event Type</th>
            <th>Severity</th>
            <th>Source IP</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.time}</td>
              <td>{event.eventType}</td>

              <td>
                <span
                  className={`severity ${event.severity.toLowerCase()}`}
                >
                  {event.severity}
                </span>
              </td>

              <td>{event.sourceIP}</td>

              <td>
                <span
                  className={`status ${event.status
                    .toLowerCase()
                    .replace(" ", "")}`}
                >
                  {event.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;