import { ImageCarousel, Header } from "..";
import styles from "./HeroBanner.module.css";

export const HeroBanner = () => {
  return (
    <div className={styles.heroBanner}>
      <ImageCarousel />
      <Header />
    </div>
  );
};
