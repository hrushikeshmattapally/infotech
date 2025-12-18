import { useState } from "react";
import API from "../services/api";

function CreateEvent() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    await API.post("/events", data);
    window.location.href = "/";
  };

  return (
    <div className="form">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="dateTime" type="datetime-local" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="capacity" placeholder="Capacity" onChange={handleChange} />
        <input type="file" name="image" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
        <button style={{ width: "100%", marginTop: 15 }}>Create</button>
      </form>
    </div>
  );
}

export default CreateEvent;
