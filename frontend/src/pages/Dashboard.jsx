import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";

function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Upcoming Events</h2>

      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
