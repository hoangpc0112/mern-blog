import { useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([{ title: "Bài 1", content: "Hello!" }]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        <div key={i}>
          <b>{p.title}</b>
          <p>{p.content}</p>
          <hr />
        </div>
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
