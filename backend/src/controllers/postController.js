import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const { title } = req.query;
    const posts = title
      ? await Post.find({ title: { $regex: title, $options: "i" } })
      : await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content, comments: [] });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

export const addCommentToPost = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const post = await Post.findById(id);
    if (post) {
      post.comments.push({ text });
      await post.save();
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (post) {
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};
