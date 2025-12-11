const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
});
const upload = multer({ storage });

router.post('/', auth, upload.single('bill'), async (req, res) => {
  req.user.bills.push({ filename: req.file.filename, originalname: req.file.originalname });
  await req.user.save();
  res.json({ success: true, file: `/uploads/${req.file.filename}` });
});

module.exports = router;
