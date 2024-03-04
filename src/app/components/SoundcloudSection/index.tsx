import styles from "./SoundcloudSection.module.css";

export const SoundcloudSection = () => {
  return (
    <div className={styles.musicSection}>
      <label>Game Music</label>
      <iframe
        className={styles.soundcloud}
        width="100%"
        height="300"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1435766095&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
      ></iframe>
    </div>
  );
};
