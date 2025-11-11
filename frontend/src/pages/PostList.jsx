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
        "http://localhost:8080/api/search?key=" + searchTerm
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
    <div>
      <h2>Blog</h2>
      {posts.map((p) => (
        <div key={p.id}>
          <Link to={`/posts/${p.id}`}>
            <b>{p.title}</b>
          </Link>
          <hr />
        </div>
      ))}

      <h2>Search</h2>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchFunc}>Search</button>
    </div>
  );
}
