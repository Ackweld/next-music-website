"use client";

import { useEffect, useState } from "react";
import { Entry } from "../../types";
import styles from "./ImageCarousel.module.css";
import Image from "next/image";

export const ImageCarousel: React.FC<Entry> = ({ fields }) => {
  const { images } = fields;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.imageCarouselContainer}>
      <button
        className={`${styles.arrowButton} ${styles.left}`}
        onClick={goToPrevSlide}
      >
        {/* Replace this with better arrows */}
        &#9665;
      </button>
      <Image
        src={`https:${images[currentIndex].fields.file.url}`}
        alt={`Slide ${currentIndex + 1}`}
        width={0}
        height={0}
        sizes="100vw"
        className={styles.carouselItem}
      />
      <button
        className={`${styles.arrowButton} ${styles.right}`}
        onClick={goToNextSlide}
      >
        &#9655;
      </button>
    </div>
  );
};
