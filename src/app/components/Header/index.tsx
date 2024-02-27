import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      <label>Contact me</label>
      <Link href="/downloads" className={styles.link}>
        Downloads
      </Link>
      <Link href="/my-services" className={styles.link}>
        My Services
      </Link>
      <Link href="/equipment" className={styles.link}>
        Equipment
      </Link>
    </header>
  );
};
