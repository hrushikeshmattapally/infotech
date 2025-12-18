import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-card">
      <h2>Login</h2>

      {error && <p style={{ color: "#dc2626", marginBottom: 10 }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
