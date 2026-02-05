'use client';

import { useState, useEffect } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  name: string;
  image: string;
  currentBid: number;
  endTime: number;
}

export default function Card({ name, image, currentBid, endTime }: CardProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft('Ended');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Using a div with background image for placeholder handling */}
        <div style={{ width: '100%', height: '100%', background: `url(${image}) center/cover no-repeat, linear-gradient(to bottom, #eee, #ddd)` }} />
        <div className={styles.timer}>{timeLeft}</div>
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <div className={styles.bidRow}>
          <div className={styles.bidInfo}>
            <span>Current bid</span>
            <strong>{currentBid} ETH</strong>
          </div>
          <button className={styles.button}>PLACE BID</button>
        </div>
      </div>
    </div>
  );
}
