import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchPostDetails = async () => {
      const res = await fetch(`http://localhost:8080/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPostDetails();
  }, [id]);

  const handleCommentSubmit = async () => {
    const res = await fetch(`http://localhost:8080/api/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: comment }),
    });
    const newPost = await res.json();
    setPost(newPost);
    setComment("");
  };

  if (!post) {
    return <div className="loading">⏳ Loading post...</div>;
  }

  return (
    <div className="page-container post-detail">
      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-body">
          <p>{post.content}</p>
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments ({post.comments?.length || 0})</h2>

        {user && (
          <div className="comment-form">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <button onClick={handleCommentSubmit} className="btn-submit">
              Post Comment
            </button>
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
