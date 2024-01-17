"use client";

// import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import styles from "./Biography.module.css";
import { useEffect, useState } from "react";

interface IBiography {
  fields: {
    profilePicture: { fields: { file: { url: string }; name: string } };
    text: Document; //TODO: Hopefully this is right? Maybe some html-type thing instead
  };
}

export const Biography: React.FC<any> = ({ bio }) => {
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
