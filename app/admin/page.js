'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [storeData, setStoreData] = useState({});
  const [mainFolder, setMainFolder] = useState('courses');
  const [subFolder, setSubFolder] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [normalPrice, setNormalPrice] = useState('');
  const [affiliatePrice, setAffiliatePrice] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  
  // Naye Features Ke Inputs
  const [accessType, setAccessType] = useState('public'); // public OR premium_10k
  const [affiliatePercent, setAffiliatePercent] = useState('10'); // Default 10% commission

  useEffect(() => {
    const savedData = localStorage.getItem('cyber_store_data');
    if (savedData) setStoreData(JSON.parse(savedData));
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!subFolder || !itemTitle || !normalPrice || !affiliatePrice) {
      alert('Bhai, saari details bharo!');
      return;
    }

    const updatedData = { ...storeData };
    
    if (!updatedData[mainFolder]) updatedData[mainFolder] = {};
    if (!updatedData[mainFolder][subFolder]) updatedData[mainFolder][subFolder] = [];

    // Naya advanced product item structure
    const newItem = {
      id: Date.now(),
      title: itemTitle,
      normalPrice: Number(normalPrice),
      affiliatePrice: Number(affiliatePrice),
      desc: itemDesc,
      access: accessType, // 'public' ya 'premium_10k'
      commissionShare: Number(affiliatePercent) // Kitna % partner ko milega
    };

    updatedData[mainFolder][subFolder].push(newItem);
    setStoreData(updatedData);
    localStorage.setItem('cyber_store_data', JSON.stringify(updatedData));
    
    alert(`🔥 Maal Live Ho Gaya! (Access: ${accessType === 'public' ? 'Sabh Ke Liye' : 'Only 10K Members'} | Share: ${affiliatePercent}%)`);
    
    // Reset Inputs
    setItemTitle('');
    setNormalPrice('');
    setAffiliatePrice('');
    setItemDesc('');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>⚡ SECURITY_&_AFFILIATE_<span style={{ color: '#FF3131' }}>CONTROL</span></h1>
        <button onClick={() => window.location.href = '/digital-products'} style={styles.viewBtn}>👀 VIEW STORE</button>
      </header>

      <div style={styles.formCard}>
        <h2 style={{color: '#00F0FF', margin: '0 0 20px 0', fontSize: '16px'}}>🚀 PUBLISH ADVANCED BUNDLE</h2>
        <form onSubmit={handleAddItem} style={styles.form}>
          
          <label style={styles.label}>1. Main Folder:</label>
          <select value={mainFolder} onChange={(e) => setMainFolder(e.target.value)} style={styles.input}>
            <option value="courses">COURSES</option>
            <option value="bundles">BUNDLES</option>
          </select>

          <label style={styles.label}>2. Sub-Folder Name:</label>
          <input type="text" placeholder="e.g., cute girl dance, share market courses" value={subFolder} onChange={(e) => setSubFolder(e.target.value.toLowerCase())} style={styles.input} />

          <label style={styles.label}>3. Item Title / Name:</label>
          <input type="text" placeholder="Product name..." value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} style={styles.input} />

          <label style={styles.label}>4. Item Description:</label>
          <textarea placeholder="Short details..." value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} style={styles.textarea} />

          <div style={styles.row}>
            <div>
              <label style={styles.label}>Normal Price (₹):</label>
              <input type="number" placeholder="1500" value={normalPrice} onChange={(e) => setNormalPrice(e.target.value)} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Affiliate Price (₹):</label>
              <input type="number" placeholder="1200" value={affiliatePrice} onChange={(e) => setAffiliatePrice(e.target.value)} style={styles.input} />
            </div>
          </div>

          {/* New Advanced Controls Section */}
          <div style={styles.divider}>🔐 SECURITY & COMMISSIONS</div>

          <label style={styles.label}>5. Who can buy this? (Access Control):</label>
          <select value={accessType} onChange={(e) => setAccessType(e.target.value)} style={styles.inputAdvanced}>
            <option value="public">🔓 SABH KE LIYE (Open For All Buyers)</option>
            <option value="premium_10k">🔒 LOCKED: Only 10K Plan Members</option>
          </select>

          <label style={styles.label}>6. Client Affiliate Commission Share (%):</label>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <input type="number" min="0" max="100" value={affiliatePercent} onChange={(e) => setAffiliatePercent(e.target.value)} style={styles.inputSmall} />
            <span style={{color: '#39FF14', fontSize: '14px'}}>% Cut will be shared with Affiliate Client</span>
          </div>

          <button type="submit" style={styles.submitBtn}>🔥 PUBLISH ADVANCED BUNDLE</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0D0D11', color: '#FFF', minHeight: '100vh', fontFamily: 'monospace', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '25px' },
  logo: { fontSize: '18px', margin: 0 },
  viewBtn: { backgroundColor: '#39FF14', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  formCard: { backgroundColor: '#141419', border: '1px solid #222', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { fontSize: '11px', color: '#888', textTransform: 'uppercase' },
  input: { backgroundColor: '#1a1a24', border: '1px solid #333', color: '#FFF', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', width: '100%', boxSizing: 'border-box' },
  inputAdvanced: { backgroundColor: '#1a1a24', border: '1px solid #FF3131', color: '#FFF', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', width: '100%', boxSizing: 'border-box' },
  inputSmall: { backgroundColor: '#1a1a24', border: '1px solid #39FF14', color: '#39FF14', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', width: '80px', textAlign: 'center' },
  textarea: { backgroundColor: '#1a1a24', border: '1px solid #333', color: '#FFF', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', height: '50px', resize: 'none' },
  row: { display: 'flex', gap: '15px' },
  divider: { margin: '15px 0 5px 0', fontSize: '12px', color: '#FF3131', fontWeight: 'bold', borderBottom: '1px dashed #FF3131', paddingBottom: '5px' },
  submitBtn: { backgroundColor: '#FF3131', color: '#FFF', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', fontSize: '13px', letterSpacing: '1px' }
};
