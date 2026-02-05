import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
             <path d="M2 16C2 16 5 12 12 12C19 12 22 16 22 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
             <path d="M2 8C2 8 5 4 12 4C19 4 22 8 22 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>DiveSea</span>
        </div>
        <div className={styles.links}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Term & Conditions</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Contact</Link>
        </div>
      </div>
      <div className={styles.copyright}>
        © 2023 DiveSea. All rights reserved.
      </div>
    </footer>
  );
}
