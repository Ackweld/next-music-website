"use client";

import styles from "./VideoGrid.module.css";
import { useEffect, useState } from "react";
import { Thumbnails, Video } from "@/app/types";
import { Modal } from "../../components";
import { ApiService } from "@/app/services/ApiService";

export const VideoGrid = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnails>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoLink, setVideoLink] = useState<string>("");

  useEffect(() => {
    const getThumbnails = async () => {
      const thumbnails = await ApiService.getData("thumbnails");
      setThumbnails(thumbnails);
    };
    getThumbnails();
  }, []);

  const openModal = (videoLink: string) => {
    setVideoLink(videoLink);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (thumbnails) {
    return (
      <div className={styles.videoGrid}>
        {thumbnails.fields.videos.map((thumbnail: Video, index: number) => (
          <img
            src={`https:${thumbnail.fields.thumbnail.fields.file.url}`}
            alt={`${thumbnail.fields.thumbnail.fields.title}`}
            className={styles.thumbnail}
            key={index}
            onClick={() => openModal(thumbnail.fields.videoLink)}
            loading="lazy"
          ></img>
        ))}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <iframe
            width="800"
            height="450"
            src={videoLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameBorder={0}
            loading="lazy"
          ></iframe>
        </Modal>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default VideoGrid;
