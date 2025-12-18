import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";
import heroImage from "../assets/hero.jpg";
import ProjectsCarousel from "../components/ProjectsCarousel";


function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div
  style={{
    padding: "120px 20px 100px",
    textAlign: "center",
    color: "white",
    backgroundImage: `
      linear-gradient(
        rgba(0,0,0,0.55),
        rgba(0,0,0,0.55)
      ),
      url(${heroImage})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <h1
    style={{
      fontSize: "44px",
      fontWeight: "800",
      marginBottom: "16px",
      letterSpacing: "-0.5px",
    }}
  >
    Discover & Join Amazing Events
  </h1>

  <p
    style={{
      fontSize: "18px",
      maxWidth: "640px",
      margin: "0 auto",
      lineHeight: "1.6",
      opacity: 0.95,
    }}
  >
    Create events, RSVP instantly, and never miss out on experiences that matter
  </p>
</div>



      {/* CONTENT LAYER */}
      <div
        className="container"
        style={{
          marginTop: "-40px",
          paddingTop: "40px",
        }}
      >
        {loading && <p style={{ color: "white" }}>Loading events...</p>}

        {!loading && events.length === 0 && (
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "14px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            <h3>No events yet</h3>
            <p style={{ color: "#6b7280" }}>
              Be the first to create one
            </p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <div className="event-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
      <ProjectsCarousel />

    </>
  );
}

export default Dashboard;
