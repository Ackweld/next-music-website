import styles from "./SpotifySection.module.css";

export const SpotifySection = () => {
  return (
    <div className={styles.musicSection}>
      <label>My Music</label>
      <iframe
        className={styles.spotify}
        src="https://open.spotify.com/embed/playlist/7Jb8AxSRogPWgLv3NkgOGM?utm_source=generator&theme=0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};
