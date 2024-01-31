import { Biography, EmailForm, SpotifySection, VideoGrid } from "./components";
import { ApiService } from "@/app/services/ApiService";
import styles from "./page.module.css";

export default async function Home() {
  const biography = await ApiService.getData("biography");
  const thumbnails = await ApiService.getData("thumbnails");

  return (
    <main className={styles.main}>
      <div className={styles.pageContent}>
        {biography && <Biography bio={biography} />}
        {thumbnails && <VideoGrid {...thumbnails} />}
        <SpotifySection />
        <EmailForm />
      </div>
    </main>
  );
}
