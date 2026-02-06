const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("InnogenAI Bot Live ✅");
});

app.post("/whatsapp/webhook", (req, res) => {
  console.log("Incoming:", req.body);
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
