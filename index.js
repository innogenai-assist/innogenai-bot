const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// 🔹 Number → Client Software Mapping
// (ye tum DB / JSON / admin panel se bhi laa sakte ho)
const CLIENT_MAP = {
  "whatsapp:+911111111111": "https://innogenai-bot.onrender.com/webhook/whatsapp",
  "whatsapp:+922222222222": "http://client-b-software:5000/from-render",
  "whatsapp:+933333333333": "http://client-c-software:5000/from-render"
};

app.get("/", (req, res) => {
  res.send("InnogenAI Router Live ✅");
});

// 🔹 Twilio → Render
app.post("/whatsapp/webhook", async (req, res) => {
  try {
    const incomingMsg = req.body.Body;
    const fromUser = req.body.From; // user number
    const toNumber = req.body.To;   // 🔥 client WhatsApp number

    console.log("Msg to:", toNumber, "from:", fromUser);

    // 🔎 Find client automatically
    const clientURL = CLIENT_MAP[toNumber];

    if (!clientURL) {
      console.log("No client found for", toNumber);
      return res.send("No client configured");
    }

    // 🔁 Forward to correct client software
    const clientResponse = await fetch(clientURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: incomingMsg,
        from: fromUser,
        to: toNumber
      })
    }).then(r => r.text());

    // 🔚 IMPORTANT
    // Render yahin khatam
    // Reply bhejna client software ka kaam hai
    res.send("OK");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Router running on", PORT);
});
