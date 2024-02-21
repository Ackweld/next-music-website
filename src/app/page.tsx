import {
  BiographySection,
  EmailForm,
  SpotifySection,
  VideoGrid,
} from "./components";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.pageContent}>
        <BiographySection />
        <VideoGrid />
        <SpotifySection />
        <EmailForm />
      </div>
    </main>
  );
}
