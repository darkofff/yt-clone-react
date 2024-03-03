import styles from "./Video.module.scss";

import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";

function Video({ video }) {
  const navigate = useNavigate();

  const {
    url,
    title,
    videoOwnerChannelTitle,
    thumbnail,
    publishedAt,
    channelImg,
  } = video;

  function handleClick() {
    scrollToTop();
    navigate(`/watch?v=${url}`);
  }

  return (
    <div className={styles.video} onClick={handleClick}>
      <div className={styles.videoContainer}>
        <img src={thumbnail} alt="YT-logo" loading="lazy"></img>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.logoContainer}>
          <img src={channelImg} alt="ChannelLogo" />
        </div>
        <div className={styles.textContainer}>
          <p className={`${"text"} ${styles.title}`}>{title}</p>
          <p className={`${"text-secondary-color"} ${styles.channelTitle}`}>
            {videoOwnerChannelTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Video;
