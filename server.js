const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.urlencoded({ extended: false }));

const DISCORD_WEBHOOK = "https://discordapp.com/api/webhooks/1462150846069608632/zt8PlqCfsdpTsgEwU_sR7BDCcPmPyLcn07avJxnSwB126V1F7JBfPXzzmul1mSGB3xYQ";

app.get("/", (req, res) => {
  res.send(`
  <html><body style="background:#000;color:#fff;text-align:center;font-family:Arial">
  <h2>تقديم لاعب</h2>
  <form method="POST" action="/apply">
    <input name="name" placeholder="اسم اللاعب" required><br><br>
    <input name="age" placeholder="العمر" required><br><br>
    <button>إرسال</button>
  </form>
  </body></html>
  `);
});

app.post("/apply", (req, res) => {
  fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Webhook",
      content: `📩 تقديم جديد\n👤 الاسم: ${req.body.name}\n🎂 العمر: ${req.body.age}`
    })
  });
  res.send("تم الإرسال بنجاح");
});

app.listen(3000, () => console.log("http://localhost:3000"));
