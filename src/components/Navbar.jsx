import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-dot" />
        Inkwell
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.username}</span>
            <Link to="/posts" className="nav-link">Posts</Link>
            <button onClick={handleLogout} className="nav-btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/posts" className="nav-link">Explore</Link>
            <Link to="/login" className="nav-btn">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
