import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/posts", { replace: true });
    return null;
  }

  const validate = () => {
    const errs = {};
    if (!username.trim()) errs.username = "Username is required";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 4) errs.password = "Password must be at least 4 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setErrors({});
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));
    const result = login(username, password);
    if (result.success) {
      navigate("/posts");
    } else {
      setErrors({ form: result.error });
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="grain" />
      <div className="login-blob" />

      <div className="login-container">
        <div className="login-left">
          <Link to="/" className="login-brand">
            <span className="brand-dot-lg" />
            Inkwell
          </Link>
          <div className="login-quote">
            <blockquote>
              "A writer only begins a book. A reader finishes it."
            </blockquote>
            <cite>— Samuel Johnson</cite>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <h1 className="login-title">Welcome back</h1>
            <p className="login-sub">Sign in to continue writing</p>

            {errors.form && (
              <div className="form-error-banner">{errors.form}</div>
            )}

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <div className="field">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  className={errors.username ? "input-error" : ""}
                  autoComplete="username"
                />
                {errors.username && <span className="field-error">{errors.username}</span>}
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={errors.password ? "input-error" : ""}
                  autoComplete="current-password"
                />
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <span className="loading-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  "Sign In →"
                )}
              </button>
            </form>

            <p className="login-footer">
              Just browsing?{" "}
              <Link to="/posts">Explore posts</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
