const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  console.log("Đã nhận được request GET tại /api/data");

  res.json({
    message: "Chào bạn, đây là data từ backend!",
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ],
  });
});

app.listen(5000, () => {
  console.log(`Backend server đang chạy trên port 5000`);
});
