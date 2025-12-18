import API from "../services/api";

// Extract userId from JWT
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).id;
  } catch {
    return null;
  }
};

function EventCard({ event }) {
  const userId = getUserIdFromToken();

  const handleRSVP = async () => {
    try {
      await API.post(`/events/${event._id}/rsvp`);
      alert("Successfully joined!");
      window.location.reload();
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to RSVP");
        window.location.href = "/login";
      } else {
        alert(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this event permanently?")) return;

    try {
      await API.delete(`/events/${event._id}`);
      alert("Event deleted");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="event-card">
      {/* IMAGE */}
      {event.image && <img src={event.image} alt={event.title} />}

      {/* CONTENT */}
      <div className="event-content">
        <h3>{event.title}</h3>

        <div className="event-meta">
          📍 {event.location} <br />
          📅 {new Date(event.dateTime).toLocaleString()}
        </div>

        <p style={{ fontSize: "14px", marginTop: "6px" }}>
          {event.description}
        </p>

        <p className="event-meta" style={{ marginTop: "10px" }}>
          👥 {event.attendees.length} / {event.capacity} attending
        </p>
      </div>

      {/* ACTIONS */}
      <div className="event-actions">
        <button
          onClick={handleRSVP}
          disabled={event.attendees.length >= event.capacity}
          style={{ width: "100%" }}
        >
          {event.attendees.length >= event.capacity ? "Event Full" : "RSVP"}
        </button>

        {/* DELETE ONLY FOR CREATOR */}
        {userId === event.createdBy._id && (
          <button
            className="delete-btn"
            onClick={handleDelete}
            style={{ width: "100%" }}
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
}

export default EventCard;
