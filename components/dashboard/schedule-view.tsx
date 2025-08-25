export default function ScheduleView() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const events: Record<string, string[]> = {
    Wed: ["6PM - Lee Park"],
    Fri: ["7PM - Team Event"],
  };

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Schedule Management</h3>
        <button className="btn primary">➕ New Booking</button>
      </div>
      <div className="schedule-calendar">
        {days.map((d) => (
          <div key={d} className="calendar-day">
            <div className="calendar-day-header">{d}</div>
            {events[d]?.map((ev) => (
              <div key={ev} className="calendar-event">{ev}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
