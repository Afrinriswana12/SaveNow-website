import React, { useEffect, useState } from 'react';
import API from '../api';
import { motion } from 'framer-motion';

export default function Dashboard(){
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(()=>{
    const fetch = async () => {
      try {
        const r = await API.get('/users/me');
        setUser(r.data);
      } catch (err) { console.error(err); }
    };
    fetch();
  },[]);

  useEffect(()=>{
    if (!user) return;
    const calc = () => {
      const now = new Date();
      const exp = new Date(user.membership.expiresAt);
      const diff = exp - now;
      if (diff <= 0) return setTimeLeft('Expired');
      const d = Math.floor(diff / (24*3600*1000));
      const h = Math.floor((diff % (24*3600*1000)) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${d}d ${h}h ${m}m`);
    };
    calc();
    const id = setInterval(calc, 60000);
    return ()=> clearInterval(id);
  },[user]);

  if (!user) return (
    <motion.div className="container">
      <div className="card">Please login to see your dashboard.</div>
    </motion.div>
  );

  return (
    <motion.section className="container" initial={{opacity:0}} animate={{opacity:1}}>
      <h2 style={{color:'#063b9a'}}>Welcome back, {user.name}</h2>
      <div className="grid grid-4" style={{marginTop:12}}>
        <motion.div className="card" whileHover={{ y:-6 }}>
          <div className="small header-small">Total Savings</div>
          <div style={{fontWeight:800, fontSize:20}}>₹{user.totalSavings.toFixed(2)}</div>
        </motion.div>
        <motion.div className="card" whileHover={{ y:-6 }}>
          <div className="small header-small">Coupons Purchased</div>
          <div style={{fontWeight:800, fontSize:20}}>{user.totalCoupons}</div>
        </motion.div>
        <motion.div className="card" whileHover={{ y:-6 }}>
          <div className="small header-small">Membership</div>
          <div style={{fontWeight:800, fontSize:20}}>{user.membership.type}</div>
        </motion.div>
        <motion.div className="card" whileHover={{ y:-6 }}>
          <div className="small header-small">Membership Validity</div>
          <div style={{fontWeight:800, fontSize:20}}>{timeLeft}</div>
        </motion.div>
      </div>
    </motion.section>
  );
}
