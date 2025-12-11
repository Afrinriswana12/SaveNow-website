import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ p, onBuy }){
  return (
    <motion.div className="card" whileHover={{ scale: 1.02 }} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div className="product-thumb">🛍️</div>
      <h3>{p.title}</h3>
      <div style={{ fontWeight:700 }}>₹{p.price}</div>
      <div className="small">Cashback: {p.cashbackPercent}%</div>
      <div className="small">Coupons left: {p.couponsAvailable}</div>
      <button className="btn" style={{ marginTop:12 }} onClick={onBuy} disabled={p.couponsAvailable<=0}>Buy Coupon</button>
    </motion.div>
  );
}
