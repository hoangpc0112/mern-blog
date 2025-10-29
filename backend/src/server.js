const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const data = [
  { id: 1, title: "title 1", content: "content 1" },
  {
    id: 2,
    title: "title 2",
    content: "content 2",
  },
];

app.get("/", (req, res) => {
  res.json(data);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(data[id]);
});

app.listen(5000, () => {
  console.log(`Backend server đang chạy trên port 5000`);
});
