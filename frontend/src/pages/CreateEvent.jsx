import { useState } from "react";
import API from "../services/api";

function CreateEvent() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("dateTime", form.dateTime);
    data.append("location", form.location);
    data.append("capacity", form.capacity);
    if (form.image) data.append("image", form.image);

    try {
      await API.post("/events", data);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="form-card">
      <h2>Create Event</h2>

      {error && <p style={{ color: "#dc2626", marginBottom: 10 }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input name="title" required onChange={handleChange} />

        <label style={{ marginTop: 12 }}>Description</label>
        <textarea
          name="description"
          rows="3"
          required
          onChange={handleChange}
        />

        <label style={{ marginTop: 12 }}>Date & Time</label>
        <input
          type="datetime-local"
          name="dateTime"
          required
          onChange={handleChange}
        />

        <label style={{ marginTop: 12 }}>Location</label>
        <input name="location" required onChange={handleChange} />

        <label style={{ marginTop: 12 }}>Capacity</label>
        <input
          type="number"
          min="1"
          name="capacity"
          required
          onChange={handleChange}
        />

        <label style={{ marginTop: 12 }}>Event Image</label>
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <button style={{ width: "100%", marginTop: 20 }}>
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
