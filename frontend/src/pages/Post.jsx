import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiClient from "../configs/apiClient";
import "../styles/post.css";

export default function BlogDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const user = localStorage.getItem("user");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      const res = await ApiClient.get(`/posts/${id}`);
      if (res.ok) {
        setPost(res.body);
        setError(null);
      } else {
        setError("Failed to fetch post details. Error: " + res.body.message);
      }
      setLoading(false);
    };
    fetchPostDetails();
  }, [id]);

  const handleCommentSubmit = async () => {
    const res = await ApiClient.post(`/posts/${id}/comments`, {
      text: comment,
    });
    if (res.ok) {
      setPost(res.body);
      setError(null);
    } else {
      setError("Failed to post comment. Error: " + res.body.message);
    }
    setComment("");
  };

  return loading ? (
    <div className="loading">Loading post...</div>
  ) : (
    <div className="post-detail">
      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-body">
          <p>{post.content}</p>
        </div>
      </article>{" "}
      {error && <p className="error-message">{error}</p>}
      <section className="comments-section">
        <h2>Comments ({post.comments?.length || 0})</h2>

        {user && (
          <div className="comment-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit();
              }}
            >
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button type="submit">Post Comment</button>
            </form>
          </div>
        )}

        {!user && (
          <div className="login-prompt">Please login to leave a comment</div>
        )}

        <div className="comments-list">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c) => (
              <div key={c._id} className="comment-item">
                <div className="comment-text">{c.text}</div>
              </div>
            ))
          ) : (
            <div className="no-comments">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
