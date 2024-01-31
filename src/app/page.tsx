import { Biography, EmailForm, SpotifySection, VideoGrid } from "./components";
import { ApiService } from "@/app/services/ApiService";
import styles from "./page.module.css";
import { BASE_API_URL } from "./lib/constants";

export default async function Home() {
  // if (!BASE_API_URL) {
  //   return null;
  // }
  if (process.env.VERCEL_ENV === "preview") {
    return null;
  }
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
