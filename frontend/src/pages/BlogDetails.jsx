import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      const res = await fetch(`http://localhost:5000/${id}`);
      const data = await res.json();
      setPost(data);
    };

    fetchPostDetails();
  }, [id]);

  if (!post) {
    return <div>Đang tải bài viết...</div>;
  }

  return (
    <div>
      <h2>Blog Details của id = {id}</h2>
      <h3>title: {post.title}</h3>
      <p>content: {post.content}</p>
    </div>
  );
}
