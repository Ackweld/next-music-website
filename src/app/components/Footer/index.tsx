import { SocialIcon } from "react-social-icons";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <SocialIcon
        href="https://open.spotify.com/artist/2VyPejP91a0RxutQMswJEM?si=X8R-10QVSwSl8_XBq0VFCg"
        url="www.spotify.com"
        bgColor="transparent"
        fgColor="white"
        className={styles.icon}
      />
      <SocialIcon
        href="https://soundcloud.com/wunjan"
        url="www.soundcloud.com"
        bgColor="transparent"
        fgColor="white"
        className={styles.icon}
      />
      <SocialIcon
        href="https://www.instagram.com/wunjan_official/"
        url="www.instagram.com"
        bgColor="transparent"
        fgColor="white"
        className={styles.icon}
      />
      <SocialIcon
        href="https://www.youtube.com/channel/UCb8Ll-VXVYYg8MKGwlzrIHA"
        url="www.youtube.com"
        bgColor="transparent"
        fgColor="white"
        className={styles.icon}
      />
    </footer>
  );
};
