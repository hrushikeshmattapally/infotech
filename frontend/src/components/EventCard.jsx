import API from "../services/api";

function EventCard({ event }) {
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
        style={{ width: "100%", marginTop: 10 }}
      >
        {event.attendees.length >= event.capacity ? "Event Full" : "RSVP"}
      </button>
    </div>
  );
}

export default EventCard;
