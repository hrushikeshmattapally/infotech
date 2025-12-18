import API from "../services/api";

// Get logged-in user ID from JWT
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
        alert("Please login first");
        window.location.href = "/login";
      } else {
        alert(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

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
      {event.image && <img src={event.image} alt="event" />}

      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>
        <strong>Attendees:</strong> {event.attendees.length}/{event.capacity}
      </p>

      <button
        onClick={handleRSVP}
        disabled={event.attendees.length >= event.capacity}
        style={{ width: "100%", marginTop: 8 }}
      >
        {event.attendees.length >= event.capacity ? "Event Full" : "RSVP"}
      </button>

      {/* DELETE BUTTON – ONLY FOR CREATOR */}
      {userId === event.createdBy._id && (
        <button
          onClick={handleDelete}
          style={{
            width: "100%",
            marginTop: 8,
            backgroundColor: "#dc2626",
          }}
        >
          Delete Event
        </button>
      )}
    </div>
  );
}

export default EventCard;
