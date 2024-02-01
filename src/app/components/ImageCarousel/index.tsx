"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ApiService } from "@/app/services/ApiService";
import { ImageAsset } from "../../types";
import styles from "./ImageCarousel.module.css";

export const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<ImageAsset[] | undefined>([]);
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

  const goToNextSlide = (offset: number) => {
    const newIndex = (activeIndex + offset + 7) % 7; //TODO: Magic numbers
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide(1);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [activeIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !images) {
    return <div>Error loading carousel images.</div>;
  }

  return (
    <div className={styles.carousel} data-carousel>
      <ul>
        {images.map((image, index) => (
          <li
            key={index}
            className={`${styles.slide} ${
              index === activeIndex ? styles.active : ""
            }`}
          >
            <Image
              src={`https:${image.fields.file.url}`}
              alt={`Slide ${index}`}
              // width={1920}
              // height={280}
              fill
              sizes="100vw"
              priority
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
