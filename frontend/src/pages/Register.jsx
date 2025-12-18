import { useState } from "react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-card">
      <h2>Create Account</h2>

      {error && <p style={{ color: "#dc2626", marginBottom: 10 }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input required onChange={(e) => setName(e.target.value)} />

        <label style={{ marginTop: 12 }}>Email</label>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ marginTop: 12 }}>Password</label>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={{ width: "100%", marginTop: 20 }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
