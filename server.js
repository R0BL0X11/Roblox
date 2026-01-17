const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// إيميلك
const OWNER_EMAIL = "battal.alzahrani23@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "battal.alzahrani23@gmail.com",
    pass: "APP_PASSWORD" // هنا تحط App Password من Google
  }
});

app.post("/apply", (req, res) => {
  const mail = {
    from: "Form Bot",
    to: OWNER_EMAIL,
    subject: "لاعب جديد",
    text: `تم تسجيل لاعب جديد:\nالاسم: ${req.body.player}`
  };

  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
      return res.send("صار خطأ ❌");
    }
    res.send("تم الإرسال بنجاح ✅");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
