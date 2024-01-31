"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { ApiService } from "@/app/services/ApiService";
import { ImageAsset } from "../../types";
import styles from "./ImageCarousel.module.css";

export const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<ImageAsset[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      try {
        const carouselImages = await ApiService.getData("carousel");
        setImages(carouselImages.fields.images);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error("Error fetching carousel images:", error);
      }
    };
    getImages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [activeIndex, images]);

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? (images?.length || 0) - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === (images?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !images) {
    return <div>Error loading carousel images.</div>;
  }

  return (
    <div className={styles.imageCarouselContainer}>
      <button
        className={`${styles.arrowButton} ${styles.left}`}
        onClick={goToPrevSlide}
      >
        <FaArrowLeft />
      </button>
      <Image
        src={`https:${images[activeIndex].fields.file.url}`}
        alt={`Slide ${activeIndex + 1}`}
        width={0}
        height={0}
        sizes="100vw"
        className={styles.carouselItem}
        key={activeIndex}
      />
      <button
        className={`${styles.arrowButton} ${styles.right}`}
        onClick={goToNextSlide}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};
