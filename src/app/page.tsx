import {
  Biography,
  EmailForm,
  Header,
  ImageCarousel,
  SpotifySection,
  VideoGrid,
} from "./components";
import { Thumbnails, Entry } from "./types";
import styles from "./page.module.css";
import { Footer } from "./components/Footer";
const contentful = require("contentful");

const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const fetchCarouselImages = async (): Promise<Entry> => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const carouselImages = entries.items.find(
      (item: Entry) => item.fields.name === "instruments"
    );
    if (carouselImages) {
      return carouselImages;
    } else {
      throw new Error("Carousel images entry not found");
    }
  } else {
    throw new Error("Failed to fetch entries");
  }
};
const fetchBiography = async () => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const biography = entries.items.find(
      (item: any) => item.fields.name === "biography"
    );
    return biography;
  } else {
    return {};
  }
};
const fetchThumbnails = async (): Promise<Thumbnails> => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const thumbnailsEntry = entries.items.find(
      (item: Thumbnails) => item.fields.name === "thumbnails"
    );
    if (thumbnailsEntry) {
      return thumbnailsEntry;
    } else {
      throw new Error("Thumbnails entry not found");
    }
  } else {
    throw new Error("Failed to fetch entries");
  }
};

export default async function Home() {
  const carouselImages = await fetchCarouselImages();
  const biography = await fetchBiography();
  const thumbnails = await fetchThumbnails();
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <ImageCarousel {...carouselImages} />
        <Header />
      </div>
      <div className={styles.pageContent}>
        <Biography bio={biography} />
        <VideoGrid {...thumbnails} />
        <SpotifySection />
        <EmailForm />
      </div>
      <Footer />
    </main>
  );
}
