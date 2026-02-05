'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image 
            src="/DiveSeaNft/Logo.svg" 
            alt="DiveSea" 
            width={40} 
            height={40} 
            priority
            unoptimized
          />
          <span>DiveSea</span>
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
           {/* Connect Wallet button removed */}
        </div>
      </div>
    </header>
  );
}
