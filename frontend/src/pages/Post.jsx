import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
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
      body: JSON.stringify({ text: comments }),
    });
    const newComment = await res.json();
    setPost((prevPost) => ({
      ...prevPost,
      comment: [...prevPost.comment, newComment],
    }));
    setComments("");
  };

  if (!post) {
    return <div>Đang tải bài viết...</div>;
  }

  return (
    <div>
      <h2>Blog Details của id = {id}</h2>
      <h3>title: {post.title}</h3>
      <p>content: {post.content}</p>
      <p>comment:</p>
      {post.comment &&
        post.comment.map((c) => <div key={c.id}>- {c.text}</div>)}
      {user && (
        <div>
          <h4>Thêm bình luận:</h4>
          <input
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Nhập bình luận..."
          />
          <button
            onClick={() => {
              handleCommentSubmit();
            }}
          >
            Gửi bình luận
          </button>
        </div>
      )}
    </div>
  );
}
