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
          <path d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M2 16C2 16 5 12 12 12C19 12 22 16 22 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M2 8C2 8 5 4 12 4C19 4 22 8 22 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
