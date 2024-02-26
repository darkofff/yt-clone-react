import styles from "./Video.module.scss";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";

function Video({ video }) {
  const navigate = useNavigate();

  const { url, title, videoOwnerChannelTitle, thumbnail, publishedAt } = video;

  function handleClick() {
    scrollToTop();
    navigate(`/watch?v=${url}`);
  }

  return (
    <div className={styles.video} onClick={handleClick}>
      <div className={styles.videoContainer}>
        <img src={thumbnail} alt="YT-logo"></img>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.logoContainer}>
          <img src={thumbnail} alt="ChannelLogo" />
        </div>
        <div className={styles.textContainer}>
          <p className={`${"text"} ${styles.title}`}>{title}</p>
          <p className="text">{videoOwnerChannelTitle}</p>
        </div>
      </div>
    </div>
  );
}

export default Video;
