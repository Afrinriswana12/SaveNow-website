const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Invalid file type"));
  }
});

app.post("/upload-bill", upload.single("bill"), (req, res) => {
  const { email, phone } = req.body;
  if (!email || !phone) return res.send("Email & phone required");
  res.send("Bill uploaded and verification started");
});

app.post("/contact", (req, res) => {
  res.send("Message received. Our team will contact you soon.");
});

app.listen(PORT, () =>
  console.log(`Running on http://localhost:${PORT}`)
);
