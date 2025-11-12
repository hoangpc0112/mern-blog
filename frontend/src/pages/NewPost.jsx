import { useState } from "react";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setTitle("");
      setContent("");
      alert("Post created successfully!");
    } else {
      alert("Failed to create post.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h1>Create New Post</h1>
        <form
          className="post-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter an eye-catching title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="10"
            />
          </div>
          <button type="submit" className="btn-primary">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
