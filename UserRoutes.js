const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// get current user dashboard (protected)
router.get('/me', auth, async (req, res) => {
  const u = req.user.toObject();
  delete u.passwordHash;
  res.json(u);
});

// seed a demo user (call once)
router.post('/seed', async (req, res) => {
  await User.deleteMany({});
  const u = new User({
    name: 'John Doe',
    email: 'demo@savenow.app',
    passwordHash: await require('bcrypt').hash('password', 10),
    totalSavings: 1250,
    totalCoupons: 5,
    membership: { type: 'Premium', expiresAt: new Date(Date.now() + 45*24*3600*1000) }
  });
  await u.save();
  res.json({ seeded: true, email: u.email, password: 'password' });
});

module.exports = router;
