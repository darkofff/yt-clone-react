import styles from "./VideoDescription.module.scss";

import { useState } from "react";
import { formatNumber } from "../utils/formatNumber";

export default function VideoDescription({ currentVideo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionShort = currentVideo.description.slice(0, 100);

  const date = new Date(currentVideo.publishedAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return (
    <div className={`${styles.videoDescription} ${"bg-color-desc"}`}>
      <div className={styles.statsContainer}>
        <p className={styles.stats}>
          {formatNumber(currentVideo.videoStats.viewCount)} views {year}-{month}
          -{day}{" "}
        </p>
      </div>
      {isExpanded ? (
        <>
          <pre className={styles.text}>{currentVideo.description} </pre>
          <p onClick={() => setIsExpanded(false)} className={styles.message}>
            Show less
          </p>
        </>
      ) : (
        <>
          <pre className={styles.text}>{descriptionShort} </pre>
          <p onClick={() => setIsExpanded(true)} className={styles.message}>
            ...read more
          </p>
        </>
      )}
    </div>
  );
}
