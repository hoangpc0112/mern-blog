const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./data");

const jsonParser = bodyParser.json();
const app = express();

app.use(cors());
app.use(express.json());

const user = { username: "admin", password: "admin" };

app.get("/api/posts", (req, res) => {
  res.json(data.PostList);
});

app.post("/api/posts", jsonParser, (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: data.PostList.length,
    title,
    content,
  };
  data.PostList.push(newPost);
  console.log("New post created:", newPost);
  res.json(newPost);
});

app.get("/api/stats", (req, res) => {
  res.json({ length: data.PostList.length });
});

app.get("/api/search", (req, res) => {
  const text = req.query.key;
  console.log(text);
  res.json(data.PostList.filter((e) => e.title.includes(text)));
});

app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  res.json(data.PostList[id]);
});

app.post("/api/login", jsonParser, (req, res) => {
  return req.body.username === user.username &&
    req.body.password === user.password
    ? res.json(user)
    : res.status(401);
});

app.listen(8080, () => {
  console.log(`Backend server đang chạy trên port 8080`);
});
