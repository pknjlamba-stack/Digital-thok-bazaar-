'use client';
import { useState, useRef, useEffect } from 'react';

export default function HomePage() {
  const [videoUnlocked, setVideoUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      if (currentTime >= 10) {
        setVideoUnlocked(true);
        setTimeLeft(0);
      } else {
        setTimeLeft(Math.ceil(10 - currentTime));
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      console.log("Affiliate ID Detected:", ref);
    }
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>CYBER<span style={{ color: '#39FF14' }}>STORE</span></h1>
        <div style={styles.statusBadge}>SYSTEM: ONLINE</div>
      </header>

      <main style={styles.main}>
        <div style={styles.videoWrapper}>
          <h2 style={styles.title}>🔒 UNLOCK THE SYSTEM VIA VIDEO</h2>
          <p style={styles.subtitle}>Watch at least 10 seconds of the video to unlock primary options.</p>
          
          <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            controls
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            style={styles.video}
          />

          {!videoUnlocked && (
            <div style={styles.timerZone}>
              ⏳ Unlocking in: <span style={{ color: '#00F0FF' }}>{timeLeft}s</span>
            </div>
          )}
        </div>

        <div style={styles.buttonZone}>
          <button
            disabled={!videoUnlocked}
            onClick={() => window.location.href = '/digital-products'}
            style={{
              ...styles.ctaButton,
              backgroundColor: videoUnlocked ? '#39FF14' : '#222',
              color: videoUnlocked ? '#000' : '#666',
              border: videoUnlocked ? '2px solid #39FF14' : '2px solid #444',
              cursor: videoUnlocked ? 'pointer' : 'not-allowed',
            }}
          >
            💻 {videoUnlocked ? "ENTER DIGITAL PRODUCTS" : "ACCESS LOCKED"}
          </button>

          <button
            disabled={!videoUnlocked}
            onClick={() => window.location.href = '/income-setup'}
            style={{
              ...styles.ctaButton,
              backgroundColor: videoUnlocked ? '#00F0FF' : '#222',
              color: videoUnlocked ? '#000' : '#666',
              border: videoUnlocked ? '2px solid #00F0FF' : '2px solid #444',
              cursor: videoUnlocked ? 'pointer' : 'not-allowed',
            }}
          >
            🚀 {videoUnlocked ? "5 FULL INCOME SETUP" : "ACCESS LOCKED"}
          </button>
        </div>
      </main>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
    paddingBottom: '10px',
    marginBottom: '30px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  statusBadge: {
    backgroundColor: '#142114',
    color: '#39FF14',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    border: '1px solid #39FF14',
  },
  main: {
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  videoWrapper: {
    backgroundColor: '#141419',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #222',
    marginBottom: '20px',
  },
  title: {
    fontSize: '18px',
    color: '#FFF',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '15px',
  },
  video: {
    width: '100%',
    borderRadius: '6px',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
  },
  timerZone: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#AAA',
  },
  buttonZone: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    marginTop: '20px',
  },
  ctaButton: {
    padding: '15px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    letterSpacing: '1px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  }
};
