"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { ApiService } from "@/app/services/ApiService";
import { ImageAsset } from "../../types";
import styles from "./ImageCarousel.module.css";
import Slider from "react-slick";

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

  const goToNextSlide = (offset: number) => {
    const newIndex = (activeIndex + offset + 7) % 7; // Assuming there are always 3 slides
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide(1); // Auto-advance to the next slide every 5 seconds
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
        {[0, 1, 2, 3, 4, 5, 6].map((index) => (
          <li
            key={index}
            className={`${styles.slide} ${
              index === activeIndex ? styles.active : ""
            }`}
          >
            <Image
              src={`https:${images[index].fields.file.url}`}
              alt={`Slide ${index}`}
              width={0}
              height={0}
              sizes="100vw"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
