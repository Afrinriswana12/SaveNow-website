import React, { useEffect, useState } from 'react';
import API, { setAuthToken } from '../api';
import ProductCard from '../components/ProductCard';

export default function Products(){
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(()=>{ if (token) setAuthToken(token); }, [token]);

  useEffect(()=>{
    const fetch = async ()=> {
      const r = await API.get('/products');
      setProducts(r.data);
    };
    fetch();
  },[]);

  const buy = async (id) => {
    try {
      if (!token) return alert('Login to buy');
      const r = await API.post(`/products/buy/${id}`);
      alert(`Purchase success — cashback ₹${r.data.cashback}`);
      const p = await API.get('/products');
      setProducts(p.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Buy failed');
    }
  };

  return (
    <div className="container" style={{marginTop:16}}>
      <h2 style={{color:'#063b9a'}}>Demo Products</h2>
      <div className="grid grid-3" style={{marginTop:12}}>
        {products.map(p=> <ProductCard key={p._id} p={p} onBuy={()=>buy(p._id)} />)}
      </div>
    </div>
  );
}
