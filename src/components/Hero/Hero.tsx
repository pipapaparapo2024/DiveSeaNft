'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.scss';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for content
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(`.${styles.subtitle}`, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
        .fromTo(`.${styles.content} h1`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
        .fromTo(`.${styles.description}`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(`.${styles.actions}`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(`.${styles.stats}`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

      // Timeline for visuals (images from right)
      gsap.fromTo(`.${styles.imageCard}`, 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5, ease: 'power2.out' }
      );

      // Arrow
      gsap.to(`.${styles.arrow}`, { opacity: 1, duration: 1, delay: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.subtitle}>Weekly - Top NFT</div>
        <h1>
          <span>Discover, collect,</span>
          <span>and sell rare NFTs</span>
        </h1>
        <p className={styles.description}>
          Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital assets.
        </p>
        <div className={styles.actions}>
          <button className={styles.primary}>Explore</button>
          <button className={styles.secondary}>Create</button>
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <h3>32k+</h3>
            <p>Artwork</p>
          </div>
          <div className={styles.statItem}>
            <h3>15k+</h3>
            <p>Auction</p>
          </div>
          <div className={styles.statItem}>
            <h3>12k+</h3>
            <p>Creators</p>
          </div>
        </div>
      </div>

      <div className={styles.visuals}>
        <div className={`${styles.imageCard} ${styles.card2}`}>
          {/* Placeholder gradient/image */}
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)' }}></div>
        </div>
        <div className={`${styles.imageCard} ${styles.card1}`}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' }}></div>
        </div>
        
        <div className={styles.arrow}>
           {/* Simple arrow SVG */}
           <svg viewBox="0 0 100 20" fill="none">
             <path d="M0 10H80M80 10L70 0M80 10L70 20" stroke="#333" strokeWidth="2"/>
           </svg>
        </div>
      </div>
    </section>
  );
}
