const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// get products (public)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// buy coupon for product (protected) - simulated
router.post('/buy/:id', auth, async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    if (p.couponsAvailable <= 0) return res.status(400).json({ error: 'No coupons left' });

    p.couponsAvailable -= 1;
    await p.save();

    const cashback = +(p.price * (p.cashbackPercent/100)).toFixed(2);
    const user = req.user;
    user.totalSavings += cashback;
    user.totalCoupons += 1;
    await user.save();

    res.json({ success: true, cashback, user: { totalSavings: user.totalSavings, totalCoupons: user.totalCoupons } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// seed products - call once
router.post('/seed', async (req, res) => {
  const existing = await Product.countDocuments();
  if (existing > 0) return res.json({ seeded: false, message: 'Products exist' });

  const samples = [
    { title: 'Smart Water Bottle', price: 1299, cashbackPercent: 5, couponsAvailable: 10, image: '' },
    { title: 'Noise-cancelling Earbuds', price: 2499, cashbackPercent: 8, couponsAvailable: 5, image: '' },
    { title: 'Fitness Band', price: 1999, cashbackPercent: 6, couponsAvailable: 7, image: '' },
    { title: 'Bluetooth Speaker', price: 1599, cashbackPercent: 7, couponsAvailable: 12, image: '' },
    { title: 'Power Bank 20000mAh', price: 1899, cashbackPercent: 4, couponsAvailable: 15, image: '' },
    { title: 'Portable Vacuum Cleaner', price: 2499, cashbackPercent: 9, couponsAvailable: 6, image: '' },
    { title: 'Smart LED Bulb (3 Pack)', price: 899, cashbackPercent: 5, couponsAvailable: 20, image: '' },
    { title: 'Laptop Cooling Pad', price: 1299, cashbackPercent: 6, couponsAvailable: 10, image: '' },
    { title: 'Wireless Gaming Mouse', price: 1499, cashbackPercent: 7, couponsAvailable: 8, image: '' },
    { title: 'Mini Projector', price: 4999, cashbackPercent: 10, couponsAvailable: 4, image: '' }
  ];

  await Product.insertMany(samples);
  res.json({ seeded: true, count: samples.length });
});
// temporary GET route to seed products via browser
router.get('/seed', async (req, res) => {
  try {
    const existing = await Product.countDocuments();
    if (existing > 0) return res.json({ seeded: false, message: 'Products already exist' });

    const samples = [
      { title: 'Smart Water Bottle', price: 1299, cashbackPercent: 5, couponsAvailable: 10, image: '' },
      { title: 'Noise-cancelling Earbuds', price: 2499, cashbackPercent: 8, couponsAvailable: 5, image: '' },
      { title: 'Fitness Band', price: 1999, cashbackPercent: 6, couponsAvailable: 7, image: '' },
      { title: 'Bluetooth Speaker', price: 1599, cashbackPercent: 7, couponsAvailable: 12, image: '' },
      { title: 'Power Bank 20000mAh', price: 1899, cashbackPercent: 4, couponsAvailable: 15, image: '' },
      { title: 'Portable Vacuum Cleaner', price: 2499, cashbackPercent: 9, couponsAvailable: 6, image: '' },
      { title: 'Smart LED Bulb (3 Pack)', price: 899, cashbackPercent: 5, couponsAvailable: 20, image: '' },
      { title: 'Laptop Cooling Pad', price: 1299, cashbackPercent: 6, couponsAvailable: 10, image: '' },
      { title: 'Wireless Gaming Mouse', price: 1499, cashbackPercent: 7, couponsAvailable: 8, image: '' },
      { title: 'Mini Projector', price: 4999, cashbackPercent: 10, couponsAvailable: 4, image: '' }
    ];

    await Product.insertMany(samples);
    res.json({ seeded: true, count: samples.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
