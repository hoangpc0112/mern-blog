import { useState } from "react";
import ApiClient from "../configs/apiClient";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const res = await ApiClient.post("/posts", { title, content });
    if (res.ok) {
      setTitle("");
      setContent("");
      alert("Post created successfully!");
      setError(null);
    } else {
      setError("Failed to create post. Error: " + res.body.message);
    }
  };

  return (
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
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default NewPost;
