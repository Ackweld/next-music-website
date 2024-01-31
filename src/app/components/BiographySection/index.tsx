"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import styles from "./Biography.module.css";
import { useEffect, useState } from "react";
import { ApiService } from "@/app/services/ApiService";
import { Biography } from "@/app/types";

export const BiographySection = () => {
  const [bio, setBio] = useState<Biography>();

  useEffect(() => {
    const getBio = async () => {
      const biography = await ApiService.getData("biography");
      setBio(biography);
    };
    getBio();
  }, []);

  if (bio) {
    return (
      <div className={styles.card}>
        <img
          src={`https:${bio.fields.profilePicture.fields.file.url}`}
          alt={`${bio.fields.profilePicture.fields.name}`}
          className={styles.profilePicture}
          loading="lazy"
        ></img>
        <div className={styles.biography}>
          {documentToReactComponents(bio.fields.text)}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
