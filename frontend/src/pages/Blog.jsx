import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:5000/");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const addPost = () => {
    if (title && content) {
      setPosts([...posts, { title, content }]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div>
      <h2>Blog</h2>
      {posts.map((p, i) => (
        <>
          <Link to={`/blog/${p.id}`} key={i}>
            <b>{p.title}</b>
          </Link>
          <p>{p.content}</p>
          <hr />
        </>
      ))}
      <h3>Thêm bài</h3>
      <input
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Nội dung"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={addPost}>Thêm</button>
    </div>
  );
}
