import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <label>Home</label>
      <label>My work</label>
      <label>Contact me</label>
      <Link href="/downloads" className={styles.link}>
        Downloads
      </Link>
      <Link href="/services" className={styles.link}>
        My Services
      </Link>
    </header>
  );
};
