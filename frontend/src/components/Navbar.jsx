import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h1>Eventify</h1>

      <div className="nav-links">
        <Link to="/">Events</Link>

        {token && <Link to="/create">Create</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
}

export default Navbar;
