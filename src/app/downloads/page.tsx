"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ApiService } from "../services/ApiService";
import { AudioFiles } from "../types";

export default function Downloads() {
  const [audioFiles, setAudioFiles] = useState<AudioFiles>();

  useEffect(() => {
    const getAudioFiles = async () => {
      const response = await ApiService.getData("audio-files");
      setAudioFiles(response);
    };
    getAudioFiles();
  }, []);

  return (
    <div className={styles.main}>
      <label>Downloads</label>
      <p>
        More interesting stuff to pop up here soon. <br />
        In the meantime, have some free drum & bass tunes:
      </p>
      <div className={styles.downloads}>
        <a
          href="/downloads/Slipknot%20-%20Duality%20%5BWunjan%20Remix%5D.wav"
          download
          className={styles.download}
        >
          Slipknot - Duality [Wunjan Remix].wav
        </a>
        <a
          href="/downloads/Wunjan%20-%20Virus.wav"
          download
          className={styles.download}
        >
          Wunjan - Virus.wav
        </a>
        <a
          href="/downloads/Wunjan%20-%20Disruptor.wav"
          download
          className={styles.download}
        >
          Wunjan - Disruptor.wav
        </a>
      </div>
    </div>
  );
}
