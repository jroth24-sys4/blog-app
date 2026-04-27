import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Posts.css";

const SAMPLE_POSTS = [
  {
    id: 1,
    title: "The Art of Writing in Silence",
    excerpt: "Some of the greatest works were written in solitude. Discover why silence is a writer's most powerful tool.",
    author: "Elena Marsh",
    date: "Apr 18, 2026",
    tag: "Craft",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "On the Difficulty of Beginnings",
    excerpt: "The first sentence is always the hardest. Here's how to break through the wall of the blank page.",
    author: "Tobias Klein",
    date: "Apr 12, 2026",
    tag: "Process",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Why Every Writer Should Journal",
    excerpt: "Journaling isn't just therapy — it's practice. Daily writing builds the muscle memory that storytelling demands.",
    author: "Nadia Osei",
    date: "Apr 5, 2026",
    tag: "Habits",
    readTime: "6 min read",
  },
];

function CommentBox({ username }) {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setSubmitted(true);
      setComment("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="comment-box">
      <h4>Leave a comment as <span style={{color: "#ffc864"}}>{username}</span></h4>
      {submitted ? (
        <p className="comment-success">✦ Comment posted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Write your comment, ${username}...`}
            rows={3}
          />
          <button type="submit">Post Comment</button>
        </form>
      )}
    </div>
  );
}

export default function Posts() {
  const { user } = useAuth();
  const [activePost, setActivePost] = useState(null);

  return (
    <div className="posts-page">
      <div className="grain" />
      <div className="posts-header">
        <div className="posts-header-inner">
          <h1>The Inkwell Blog</h1>
          <p>Stories, thoughts, and craft from our community of writers.</p>
        </div>
      </div>

      <div className="posts-container">
        {SAMPLE_POSTS.map((post) => (
          <article className="post-card" key={post.id}>
            <div className="post-meta">
              <span className="post-tag">{post.tag}</span>
              <span className="post-date">{post.date}</span>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-footer">
              <span className="post-author">By {post.author}</span>
              <span className="post-read">{post.readTime}</span>
            </div>

            <div className="post-expand">
              <button
                className="expand-btn"
                onClick={() => setActivePost(activePost === post.id ? null : post.id)}
              >
                {activePost === post.id ? "Close ↑" : "Read & Comment →"}
              </button>

              {activePost === post.id && (
                <div className="post-expanded">
                  <p className="post-full-text">
                    {post.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>

                  {user ? (
                    <CommentBox username={user.username} />
                  ) : (
                    <div className="comment-locked">
                      <span className="lock-icon">◈</span>
                      <p>
                        <Link to="/login">Sign in</Link> to join the conversation and leave a comment.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}