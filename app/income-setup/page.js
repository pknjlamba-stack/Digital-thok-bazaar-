'use client';
import { useState, useEffect } from 'react';

export default function IncomeSetup() {
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [affiliateId, setAffiliateId] = useState('');

  useEffect(() => {
    // Session memory se check karo kya affiliate locked hai
    const ref = sessionStorage.getItem('affiliate_ref');
    if (ref) {
      setIsAffiliate(true);
      setAffiliateId(ref);
    }
  }, []);

  // 5 Full Income Setups Ki List
  const setups = [
    { id: 1, title: "🚀 Method 1: Automated Option Trading Bot", desc: "Set up Pine Script & Lipi Script algorithms to trade Nifty options automatically based on mathematical indicators." },
    { id: 2, title: "📱 Method 2: Ad-Reward Mobile Applications", desc: "Build high-engagement utility apps using Sketchware or React Native integrated with Unity/AdMob rewards." },
    { id: 3, title: "💧 Method 3: Micro-Franchise Network (RO Water ATM Model)", desc: "A semi-automated physical+digital business structure for local high-margin automated water vending points." },
    { id: 4, title: "📦 Method 4: High-Ticket Digital Product Flipping", desc: "White-label masterclass bundles and automated trading tools sold with 100% profit margins." },
    { id: 5, title: "🔗 Method 5: Automated Mega-Affiliate Funnel", desc: "The exact cookie-lock system you are tracking right now to dynamically override customer pricing." }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => window.location.href = '/'} style={styles.backBtn}>← HOME</button>
        <h1 style={styles.logo}>5_FULL_<span style={{ color: '#00F0FF' }}>INCOME_SETUP</span></h1>
      </header>

      {/* Dynamic Status Alert */}
      <div style={styles.statusBox}>
        ⚙️ CORE STATUS: <span style={{ color: '#39FF14' }}>ACTIVE</span> {isAffiliate ? `| COOKIE_LOCK: EXT-ID [${affiliateId}]` : '| DEFAULT_MODE'}
      </div>

      {/* Methods Map */}
      <div style={styles.list}>
        {setups.map(setup => (
          <div key={setup.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{setup.title}</h3>
            <p style={styles.cardDesc}>{setup.desc}</p>
            <div style={styles.actionZone}>
              <span style={styles.lockBadge}>🔒 ENCRYPTED BLUEPRINT</span>
              <button 
                onClick={() => alert("Initializing Secure Gateway for Complete Blueprint Access...")}
                style={styles.unlockBtn}
              >
                UNLOCK SYSTEM
              </button>
            </div>
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
    fontSize: '20px',
    margin: 0,
    letterSpacing: '1px',
  },
  statusBox: {
    backgroundColor: '#16161f',
    borderLeft: '4px solid #00F0FF',
    padding: '12px',
    borderRadius: '0 6px 6px 0',
    marginBottom: '25px',
    fontSize: '13px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '650px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#141419',
    border: '1px solid #222',
    padding: '20px',
    borderRadius: '8px',
    position: 'relative',
  },
  cardTitle: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    color: '#00F0FF',
  },
  cardDesc: {
    fontSize: '13px',
    color: '#A0A0A5',
    margin: '0 0 20px 0',
    lineHeight: '1.5',
  },
  actionZone: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #222',
    paddingTop: '15px',
  },
  lockBadge: {
    color: '#FF3131',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  unlockBtn: {
    backgroundColor: '#00F0FF',
    color: '#000',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
