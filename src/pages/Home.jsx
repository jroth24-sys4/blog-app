import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Grain overlay */}
      <div className="grain" />

      {/* Floating blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <main className="home-main">
        <div className="home-tag">
          <span className="tag-dot" />
          Your creative writing space
        </div>

        <h1 className="home-title">
          Words that
          <br />
          <em>matter.</em>
        </h1>

        <p className="home-desc">
          Inkwell is a minimal, distraction-free blog platform for writers
          who care about their craft. Read, write, and share stories that leave a mark.
        </p>

        <div className="home-actions">
          {user ? (
            <>
              <Link to="/posts" className="btn-primary">
                Explore Posts →
              </Link>
              <span className="home-welcome">Welcome back, {user.username}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary">
                Start Writing →
              </Link>
              <Link to="/posts" className="btn-ghost">
                Browse Posts
              </Link>
            </>
          )}
        </div>

        <div className="home-stats">
          <div className="stat">
            <span className="stat-num">2.4k</span>
            <span className="stat-label">Stories</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">840</span>
            <span className="stat-label">Writers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">12k</span>
            <span className="stat-label">Readers</span>
          </div>
        </div>
      </main>

      <div className="home-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

      {/* Features section */}
      <section className="features">
        <h2 className="features-title">Why Inkwell?</h2>
        <div className="features-grid">
          {[
            { icon: "✦", title: "Distraction-Free", desc: "Clean editor that keeps your focus on the words, not the interface." },
            { icon: "◈", title: "Community Driven", desc: "Connect with readers and writers who appreciate thoughtful content." },
            { icon: "⬡", title: "Beautifully Minimal", desc: "Typography-first design that lets your writing breathe and shine." },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-section">
        <h2>Ready to share your story?</h2>
        <p>Join thousands of writers who found their voice on Inkwell.</p>
        <Link to={user ? "/posts" : "/login"} className="btn-primary">
          {user ? "Go to Posts →" : "Get Started →"}
        </Link>
      </section>
    </div>
  );
}
