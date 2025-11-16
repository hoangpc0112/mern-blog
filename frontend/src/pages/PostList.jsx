import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:8080/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const searchFunc = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/posts?title=" + searchTerm
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to search posts:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Post deleted successfully!");
          fetchPosts();
        } else {
          alert("Failed to delete post.");
        }
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="posts-header">
        <h1>All Posts</h1>
        <Link to="/newpost" className="btn-new-post">
          + New Post
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={searchFunc} className="btn-search">
          Search
        </button>
      </div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="no-posts">No posts found</div>
        ) : (
          posts.map((p) => (
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
          ))
        )}
      </div>
    </div>
  );
}
