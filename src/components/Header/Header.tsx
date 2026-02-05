'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import classNames from 'classnames';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <header className={classNames(styles.header, { [styles.scrolled]: scrolled })}>
      <div className={styles.logo}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12C5 8 9 8 12 12C15 16 19 16 22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 16C5 12 9 12 12 16C15 20 19 20 22 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Desktop Nav */}
      <nav className={styles.nav}>
        <Link href="#">Discover</Link>
        <Link href="#">Creators</Link>
        <Link href="#">Sell</Link>
        <Link href="#">Stats</Link>
      </nav>

      {/* Hamburger */}
      <div 
        className={classNames(styles.burger, { [styles.open]: menuOpen })}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <div className={classNames(styles.mobileMenu, { [styles.open]: menuOpen })}>
        <nav className={styles.mobileNav}>
          <Link href="#" onClick={() => setMenuOpen(false)}>Discover</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>Creators</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>Sell</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>Stats</Link>
        </nav>
        <div className={styles.mobileFooter}>
           <button>Connect Wallet</button>
        </div>
      </div>
    </header>
  );
}
