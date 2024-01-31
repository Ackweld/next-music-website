"use client";

import { useEffect, useState } from "react";
import { Entry, ImageAsset } from "../../types";
import styles from "./ImageCarousel.module.css";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { ApiService } from "@/app/services/ApiService";

// export const ImageCarousel: React.FC<Entry> = ({ fields }) => {
// const { images } = fields;
export const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<ImageAsset[]>();

  useEffect(() => {
    const getImages = async () => {
      const carouselImages = await ApiService.getData("carousel");
      setImages(carouselImages.fields.images);
    };
    getImages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const goToPrevSlide = () => {
    if (images) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToNextSlide = () => {
    if (images) {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (images) {
    return (
      <div className={styles.imageCarouselContainer}>
        <button
          className={`${styles.arrowButton} ${styles.left}`}
          onClick={goToPrevSlide}
        >
          <FaArrowLeft />
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
          <FaArrowRight />
        </button>
      </div>
    );
  } else {
    return <div className={styles.imageCarouselContainer}></div>;
  }
};
