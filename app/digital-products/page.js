'use client';
import { useState, useEffect } from 'react';

export default function DigitalProducts() {
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [affiliateId, setAffiliateId] = useState('');

  useEffect(() => {
    // 1. URL me check karo kya '?ref=...' laga hai
    const urlParams = new URLSearchParams(window.location.search);
    let ref = urlParams.get('ref');
    
    // 2. Agar URL me nahi hai, toh check karo kya browser memory (session) me saved hai
    if (!ref) {
      ref = sessionStorage.getItem('affiliate_ref');
    } else {
      // Agar naya link mila toh use memory me save kar lo
      sessionStorage.setItem('affiliate_ref', ref);
    }

    // 3. Agar affiliate mil gaya, toh discount activate karo
    if (ref) {
      setIsAffiliate(true);
      setAffiliateId(ref);
    }
  }, []);

  // Aapke products ki list (Normal Price aur Discounted Affiliate Price ke sath)
  const products = [
    { 
      id: 1, 
      name: '⚡ Premium Algorithmic Trading Script', 
      normalPrice: 1500, 
      affiliatePrice: 1200, 
      desc: 'High-performance automated strategy script for smart trading.' 
    },
    { 
      id: 2, 
      name: '📘 100-Days Scaling Masterclass E-Book', 
      normalPrice: 2000, 
      affiliatePrice: 1500, 
      desc: 'Complete step-by-step blueprint to scale your digital portfolio.' 
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => window.location.href = '/'} style={styles.backBtn}>← HOME</button>
        <h1 style={styles.logo}>DIGITAL<span style={{ color: '#39FF14' }}>PRODUCTS</span></h1>
      </header>

      {/* Affiliate Alert Badge */}
      {isAffiliate && (
        <div style={styles.affiliateAlert}>
          🛡️ SYSTEM: REFERRED BY DETECTED [ID: {affiliateId}] — AFFILIATE PRICING UNLOCKED!
        </div>
      )}

      {/* Products Grid */}
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <h3 style={styles.prodName}>{product.name}</h3>
            <p style={styles.prodDesc}>{product.desc}</p>
            
            {/* Dynamic Price Box */}
            <div style={styles.priceZone}>
              {isAffiliate ? (
                <>
                  <span style={styles.oldPrice}>₹{product.normalPrice}</span>
                  <span style={styles.newPrice}>₹{product.affiliatePrice} <span style={{fontSize: '12px', color: '#39FF14'}}>(SAVED ₹{product.normalPrice - product.affiliatePrice})</span></span>
                </>
              ) : (
                <span style={styles.normalPrice}>Price: ₹{product.normalPrice}</span>
              )}
            </div>

            {/* Buy Button */}
            <button 
              onClick={() => alert(`Redirecting to Razorpay Split Payout Route for ₹${isAffiliate ? product.affiliatePrice : product.normalPrice}...`)}
              style={styles.buyBtn}
            >
              SECURE CHECKOUT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0D0D11',
    color: '#FFF',
    minHeight: '100vh',
    fontFamily: 'monospace',
    padding: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    borderBottom: '1px solid #333',
    paddingBottom: '15px',
    marginBottom: '20px',
  },
  backBtn: {
    backgroundColor: '#222',
    color: '#FFF',
    border: '1px solid #444',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  logo: {
    fontSize: '22px',
    margin: 0,
    letterSpacing: '1px',
  },
  affiliateAlert: {
    backgroundColor: '#11222d',
    color: '#00F0FF',
    border: '1px solid #00F0FF',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '13px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#141419',
    border: '1px solid #222',
    padding: '20px',
    borderRadius: '8px',
  },
  prodName: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    color: '#FFF',
  },
  prodDesc: {
    fontSize: '13px',
    color: '#888',
    margin: '0 0 15px 0',
    lineHeight: '1.4',
  },
  priceZone: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  normalPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FFF',
  },
  oldPrice: {
    fontSize: '16px',
    textDecoration: 'line-through',
    color: '#666',
  },
  newPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#39FF14',
  },
  buyBtn: {
    width: '100%',
    backgroundColor: '#39FF14',
    color: '#000',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
    letterSpacing: '1px',
  },
};
