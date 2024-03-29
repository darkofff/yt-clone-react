import { useSearchParams } from "react-router-dom";
import styles from "./RecommendedVideo.module.scss";

import { scrollToTop } from "../utils/scrollToTop";

function RecommendedVideo({ video }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    scrollToTop();
    setSearchParams({ v: video.url });
  }
  return (
    <div className={`${styles.container} ${"hover-1"}`} onClick={handleClick}>
      <div className={styles.img_container}>
        <img className={styles.img} src={video.thumbnail} alt="thumbnail" />
      </div>
      <div className={styles.text_container}>
        <div>
          <h1 className={`${styles.title} ${styles.twoLines}`}>
            {video.title}
          </h1>
        </div>
        <div>
          <p className={`${styles.info} ${"text-secondary-color"}`}>
            {video.videoOwnerChannelTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecommendedVideo;
