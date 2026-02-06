import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
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
          <div className={styles.desktopCopyright}>© 2023</div>
        </div>
        <div className={styles.links}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Term & Conditions</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Contact</Link>
        </div>
      </div>
      <div className={styles.mobileCopyright}>
        © 2023 DiveSea All Rights Reserved.
      </div>
    </footer>
  );
}
