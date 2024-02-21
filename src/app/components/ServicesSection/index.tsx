"use client";

import { ApiService } from "@/app/services/ApiService";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./ServicesSection.module.css";

export const ServicesSection = () => {
  const [info, setInfo] = useState<any>();

  useEffect(() => {
    const getInfo = async () => {
      const info = await ApiService.getData("services");
      setInfo(info);
    };
    getInfo();
  }, []);

  if (info) {
    return (
      <div className={styles.services}>
        <label>My Services</label>
        {documentToReactComponents(info.fields.text)}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
