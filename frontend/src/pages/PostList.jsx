import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiClient from "../configs/apiClient";
import "../styles/postList.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    const res = await ApiClient.get(
      "/posts",
      searchTerm ? { title: searchTerm } : {}
    );
    if (res.ok) {
      setPosts(res.body);
      setError(null);
    } else {
      setError("Failed to fetch posts. Error: " + res.body.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await ApiClient.delete(`/posts/${id}`);
      if (res.ok) {
        alert("Post deleted successfully!");
        fetchPosts();
      } else {
        setError("Failed to delete post. Error: " + res.body.message);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h1>All Posts</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={() => fetchPosts(searchTerm)} className="btn-search">
          Search
        </button>
      </div>
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">No posts found</div>
      ) : (
        <div className="posts-grid">
          {posts.map((p) => (
            <div key={p._id} className="post-card">
              <Link to={`/posts/${p._id}`} className="post-card-link">
                <h3 className="post-title">{p.title}</h3>
                <p className="post-excerpt">
                  {p.content?.substring(0, 120)}...
                </p>
              </Link>
              <div className="post-actions">
                <button
                  onClick={() => handleUpdate(p._id)}
                  className="btn-edit"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
