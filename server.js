const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
  console.log("Form Data:", req.body);
  res.send("Received");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});