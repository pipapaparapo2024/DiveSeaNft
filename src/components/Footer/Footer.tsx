import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image 
            src="/DiveSeaNft/Logo.svg" 
            alt="DiveSea" 
            width={30} 
            height={30} 
            unoptimized 
          />
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
        © 2023 <span className={styles.fullText}>DiveSea All Rights Reserved.</span>
      </div>
    </footer>
  );
}
