const express = require("express");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const WEBHOOK = "https://discordapp.com/api/webhooks/1462150846069608632/zt8PlqCfsdpTsgEwU_sR7BDCcPmPyLcn07avJxnSwB126V1F7JBfPXzzmul1mSGB3xYQ";

app.post("/apply", async (req, res) => {
  const { name, age } = req.body;

  await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "📨 تقديم جديد",
        color: 3447003,
        fields: [
          { name: "اسم المستخدم", value: name || "غير معروف", inline: true },
          { name: "خبراتك", value: age || "غير معروف", inline: true }
        ]
      }]
    })
  });

  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Server Running: http://localhost:3000");
});
