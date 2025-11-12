const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postList = require("./data");

const jsonParser = bodyParser.json();
const app = express();
const data = postList.PostList;

app.use(cors());
app.use(express.json());

const user = { username: "admin", password: "admin" };

app.get("/api/posts", (req, res) => {
  res.json(data);
});

app.post("/api/posts", jsonParser, (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: data.length,
    title,
    content,
    comment: [],
  };
  data.push(newPost);
  console.log("New post created:", newPost);
  res.json(newPost);
});

app.get("/api/stats", (req, res) => {
  res.json({ length: data.length });
});

app.get("/api/search", (req, res) => {
  const text = req.query.key;
  console.log(text);
  res.json(data.filter((e) => e.title.includes(text)));
});

app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  res.json(data[id]);
});

app.post("/api/posts/:id/comments", jsonParser, (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  console.log(id, text);

  const newComment = {
    id: data[id].comment.length,
    text,
  };
  data[id].comment.push(newComment);
  console.log(`New comment added to post ${id}:`, newComment);
  res.json(newComment);
});

app.post("/api/login", jsonParser, (req, res) => {
  return req.body.username === user.username &&
    req.body.password === user.password
    ? res.json(user)
    : res.status(401);
});

app.listen(8080, () => {
  console.log(`Server is running at http://localhost:8080`);
});
