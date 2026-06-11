'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  // Mock data - jab database connect hoga toh yeh data wahan se real-time aayega
  const [stats, setStats] = useState({
    totalTraffic: 1420,
    totalSales: 48500,
    affiliateClicks: 680,
    totalPayouts: 18400
  });

  const [affiliates, setAffiliates] = useState([
    { id: 'ref101', name: 'Rahul Sharma', clicks: 240, sales: 5, earnings: 6000, status: 'Paid' },
    { id: 'bhai123', name: 'Amit Verma', clicks: 410, sales: 12, earnings: 12400, status: 'Pending' },
    { id: 'alpha_trader', name: 'Vikram Singh', clicks: 30, sales: 0, earnings: 0, status: 'N/A' }
  ]);

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <header style={styles.header}>
        <h1 style={styles.logo}>⚡ CENTRAL_ADMIN_<span style={{ color: '#FF3131' }}>PANEL</span></h1>
        <div style={styles.securityBadge}>🔑 SECURE ROOT ACCESS</div>
      </header>

      {/* Stats Counter Row */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statTitle}>🌐 TOTAL TRAFFIC</div>
          <div style={styles.statNumber}>{stats.totalTraffic}</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statTitle, color: '#39FF14'}}>💰 TOTAL REVENUE</div>
          <div style={{...styles.statNumber, color: '#39FF14'}}>₹{stats.totalSales}</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statTitle, color: '#00F0FF'}}>🔗 AFFILIATE CLICKS</div>
          <div style={{...styles.statNumber, color: '#00F0FF'}}>{stats.affiliateClicks}</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statTitle, color: '#FFFF00'}}>💸 PENDING PAYOUTS</div>
          <div style={{...styles.statNumber, color: '#FFFF00'}}>₹{stats.totalPayouts}</div>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Affiliate Tracking Section */}
      <h2 style={styles.sectionTitle}>📋 AFFILIATE NETWORK PERFORMANCE</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>NAME</th>
              <th style={styles.th}>CLICKS</th>
              <th style={styles.th}>SALES</th>
              <th style={styles.th}>EARNINGS</th>
              <th style={styles.th}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.map((aff, index) => (
              <tr key={index} style={styles.trRow}>
                <td style={{...styles.td, color: '#00F0FF'}}>{aff.id}</td>
                <td style={styles.td}>{aff.name}</td>
                <td style={styles.td}>{aff.clicks}</td>
                <td style={styles.td}>{aff.sales}</td>
                <td style={{...styles.td, color: '#39FF14'}}>₹{aff.earnings}</td>
                <td style={{
                  ...styles.td, 
                  color: aff.status === 'Paid' ? '#39FF14' : aff.status === 'Pending' ? '#FFFF00' : '#888'
                }}>
                  [{aff.status}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    borderBottom: '1px solid #333',
    paddingBottom: '15px',
    marginBottom: '25px',
  },
  logo: {
    fontSize: '20px',
    margin: 0,
    letterSpacing: '1px',
  },
  securityBadge: {
    backgroundColor: '#2b1111',
    color: '#FF3131',
    padding: '5px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    border: '1px solid #FF3131',
    fontWeight: 'bold',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '15px',
    marginBottom: '25px',
  },
  statCard: {
    backgroundColor: '#141419',
    border: '1px solid #222',
    padding: '15px',
    borderRadius: '6px',
    textAlign: 'center',
  },
  statTitle: {
    fontSize: '11px',
    color: '#888',
    marginBottom: '8px',
    letterSpacing: '1px',
  },
  statNumber: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #222',
    margin: '25px 0',
  },
  sectionTitle: {
    fontSize: '16px',
    color: '#FFF',
    marginBottom: '15px',
    letterSpacing: '1px',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#141419',
    border: '1px solid #222',
    borderRadius: '6px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '13px',
  },
  thRow: {
    borderBottom: '2px solid #222',
    backgroundColor: '#1a1a22',
  },
  th: {
    padding: '12px',
    color: '#888',
    fontWeight: 'normal',
  },
  trRow: {
    borderBottom: '1px solid #222',
  },
  td: {
    padding: '12px',
  }
};
