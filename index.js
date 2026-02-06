const express = require("express");
const app = express();

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("InnogenAI Bot Live ✅");
});

// Twilio / WhatsApp webhook
app.post("/whatsapp/webhook", (req, res) => {
  console.log("Incoming message:", req.body);
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
