const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const data = [
  { id: 0, title: "title 0", content: "content 0" },
  {
    id: 1,
    title: "title 1",
    content: "content 1",
  },
];

app.get("/", (req, res) => {
  res.json(data);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(data[id]);
});

app.listen(8080, () => {
  console.log(`Backend server đang chạy trên port 8080`);
});
