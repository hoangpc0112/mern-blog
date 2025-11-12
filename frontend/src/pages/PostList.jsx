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

  return (
    <div className="page-container">
      <h1>All Posts</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={searchFunc} className="btn-search">
          Search
        </button>
      </div>

      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="no-posts">No posts found</div>
        ) : (
          posts.map((p) => (
            <div key={p._id} className="post-item">
              <Link to={`/posts/${p._id}`} className="post-link">
                <h3>{p.title}</h3>
                <p className="post-preview">
                  {p.content?.substring(0, 150)}...
                </p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
