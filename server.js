const express = require("express");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const PORT = 3000;

const ADMIN_EMAIL = "battal.alzahrani23@gmail.com";
const APP_PASSWORD = "PUT_YOUR_APP_PASSWORD_HERE"; // App Password من Gmail

const requests = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMIN_EMAIL,
    pass: APP_PASSWORD
  }
});

app.post("/request", (req, res) => {
  const id = uuidv4();
  requests[id] = { ...req.body, status: "pending" };

  const approve = `http://localhost:${PORT}/approve/${id}`;
  const reject  = `http://localhost:${PORT}/reject/${id}`;

  transporter.sendMail({
    to: ADMIN_EMAIL,
    subject: "طلب تسجيل دخول جديد",
    html: `
      <h3>طلب جديد</h3>
      <p>اسم المستخدم: ${req.body.name}</p>
      <p>كلمة المرور: ${req.body.password}</p>
      <a href="${approve}">✅ قبول</a><br><br>
      <a href="${reject}">❌ رفض</a>
    `
  });

  res.json({ id });
});

app.get("/approve/:id", (req, res) => {
  if (requests[req.params.id])
    requests[req.params.id].status = "approved";
  res.send("تم القبول");
});

app.get("/reject/:id", (req, res) => {
  if (requests[req.params.id])
    requests[req.params.id].status = "rejected";
  res.send("تم الرفض");
});

app.get("/status/:id", (req, res) => {
  res.json(requests[req.params.id] || { status: "not_found" });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
