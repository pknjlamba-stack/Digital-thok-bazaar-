'use client';
import { useState, useEffect } from 'react';

export default function DigitalProducts() {
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [affiliateId, setAffiliateId] = useState('');
  const [storeData, setStoreData] = useState({});
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeSubFolder, setActiveSubFolder] = useState(null);
  
  // Local testing ke liye membership state (Real me ye databases se manage hoti h)
  const [has10kMembership, setHas10kMembership] = useState(false);

  useEffect(() => {
    const ref = sessionStorage.getItem('affiliate_ref');
    if (ref) {
      setIsAffiliate(true);
      setAffiliateId(ref);
    }

    const savedData = localStorage.getItem('cyber_store_data');
    if (savedData) {
      setStoreData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => window.location.href = '/'} style={styles.backBtn}>← HOME</button>
        <h1 style={styles.logo}>CYBER_<span>MARKETPLACE</span></h1>
        
        {/* Testing Badge taaki aap khud lock check kar sako */}
        <button 
          onClick={() => setHas10kMembership(!has10kMembership)} 
          style={{...styles.toggleStatus, backgroundColor: has10kMembership ? '#39FF14' : '#FF3131', color: has10kMembership ? '#000' : '#FFF'}}
        >
          {has10kMembership ? '👑 STATUS: 10K MEMBER ACTIVE' : '❌ STATUS: NORMAL USER'}
        </button>
      </header>

      {isAffiliate && (
        <div style={styles.affiliateAlert}>
          🛡️ SYSTEM: REFERRED BY DETECTED [ID: {affiliateId}] — AFFILIATE DISCOUNT UNLOCKED!
        </div>
      )}

      {/* Main Folders */}
      <h2 style={styles.sectionTitle}>📁 MAIN FOLDERS</h2>
      <div style={styles.folderRow}>
        {Object.keys(storeData).map((folder) => (
          <button 
            key={folder} 
            onClick={() => { setActiveFolder(folder); setActiveSubFolder(null); }}
            style={{...styles.folderBtn, border: activeFolder === folder ? '1px solid #00F0FF' : '1px solid #333'}}
          >
            📂 {folder.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Sub Folders */}
      {activeFolder && (
        <>
          <h2 style={styles.sectionTitle}>📂 SUB FOLDERS INSIDE [{activeFolder.toUpperCase()}]</h2>
          <div style={styles.folderRow}>
            {Object.keys(storeData[activeFolder] || {}).map((subFolder) => (
              <button 
                key={subFolder} 
                onClick={() => setActiveSubFolder(subFolder)}
                style={{...styles.subFolderBtn, border: activeSubFolder === subFolder ? '1px solid #39FF14' : '1px solid #333'}}
              >
                📁 {subFolder}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Advanced Products Grid */}
      {activeFolder && activeSubFolder && (
        <>
          <h2 style={styles.sectionTitle}>📦 ITEMS IN [{activeSubFolder.toUpperCase()}]</h2>
          <div style={styles.grid}>
            {(storeData[activeFolder][activeSubFolder] || []).length === 0 ? (
              <p style={{color: '#666'}}>Is folder me koi maal nahi h.</p>
            ) : (
              (storeData[activeFolder][activeSubFolder] || []).map((product) => {
                // Lock condition algorithm
                const isLocked = product.access === 'premium_10k' && !has10kMembership;
                const activePrice = isAffiliate ? product.affiliatePrice : product.normalPrice;
                const partnerCut = ((activePrice * (product.commissionShare || 0)) / 100).toFixed(0);

                return (
                  <div key={product.id} style={{...styles.card, border: isLocked ? '1px solid #FF3131' : '1px solid #222'}}>
                    <div style={styles.cardHeader}>
                      <h3 style={styles.cardTitle}>{product.title}</h3>
                      <span style={{
                        ...styles.badge, 
                        backgroundColor: product.access === 'public' ? '#112211' : '#221111',
                        color: product.access === 'public' ? '#39FF14' : '#FF3131',
                        border: product.access === 'public' ? '1px solid #39FF14' : '1px solid #FF3131'
                      }}>
                        {product.access === 'public' ? '🔓 OPEN' : '🔒 10K ONLY'}
                      </span>
                    </div>
                    
                    <p style={styles.cardDesc}>{product.desc}</p>
                    
                    {/* Price Tag */}
                    <div style={styles.priceZone}>
                      {isAffiliate ? (
                        <>
                          <span style={styles.oldPrice}>₹{product.normalPrice}</span>
                          <span style={styles.newPrice}>₹{product.affiliatePrice}</span>
                        </>
                      ) : (
                        <span style={styles.newPrice}>₹{product.normalPrice}</span>
                      )}
                    </div>

                    {/* Affiliate Share System Log */}
                    {isAffiliate && product.commissionShare > 0 && (
                      <div style={styles.shareLog}>
                        📢 Partner Cut ({product.commissionShare}%): <b>₹{partnerCut}</b>
                      </div>
                    )}

                    {/* Dynamic Lock Button Control */}
                    {isLocked ? (
                      <button style={styles.lockedBtn} onClick={() => alert('❌ Ghabrao mat! Yeh bundle sirf unke liye hai jinhone 10K wala access liya hai.')}>
                        🔒 LOCKED (10K MEMBERS ONLY)
                      </button>
                    ) : (
                      <button style={styles.buyBtn} onClick={() => alert(`Redirecting to secure gateway... Payout shared: ₹${partnerCut}`)}>
                        🚀 INSTANT DOWNLOAD
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0D0D11', color: '#FFF', minHeight: '100vh', fontFamily: 'monospace', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '15px', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' },
  backBtn: { backgroundColor: '#141419', color: '#FFF', border: '1px solid #333', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' },
  logo: { fontSize: '20px', margin: 0 },
  toggleStatus: { border: 'none', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' },
  affiliateAlert: { backgroundColor: '#112211', border: '1px solid #39FF14', color: '#39FF14', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '12px' },
  sectionTitle: { fontSize: '13px', color: '#888', margin: '20px 0 10px 0' },
  folderRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' },
  folderBtn: { backgroundColor: '#141419', color: '#00F0FF', padding: '12px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
  subFolderBtn: { backgroundColor: '#1a1a24', color: '#39FF14', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#141419', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  cardTitle: { margin: 0, fontSize: '15px', color: '#FFF', flex: 1 },
  badge: { fontSize: '10px', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold', marginLeft: '10px' },
  cardDesc: { fontSize: '12px', color: '#888', margin: '0 0 15px 0', lineHeight: '1.4' },
  priceZone: { marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' },
  oldPrice: { textDecoration: 'line-through', color: '#FF3131', fontSize: '13px' },
  newPrice: { color: '#39FF14', fontSize: '18px', fontWeight: 'bold' },
  shareLog: { backgroundColor: '#1a1414', border: '1px solid #ff9900', color: '#ff9900', padding: '6px', borderRadius: '4px', fontSize: '11px', marginBottom: '15px' },
  buyBtn: { backgroundColor: '#00F0FF', color: '#000', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', width: '100%' },
  lockedBtn: { backgroundColor: '#221111', color: '#FF3131', border: '1px dashed #FF3131', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'not-allowed', width: '100%' }
};
