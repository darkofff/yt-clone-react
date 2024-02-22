import styles from "./Video.module.scss";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";
/* 
const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Optional: Smooth scrolling animation
  });
}; */

function Video({ video, setCurrent, dispatch }) {
  const navigate = useNavigate();

  const { url, title, videoOwnerChannelTitle, thumbnail, publishedAt } = video;

  function handleClick() {
    scrollToTop();
    //setCurrent(url);
    navigate(`/watch?v=${url}`);
  }

  return (
    <div className={styles.video} onClick={handleClick}>
      <div className={styles.videoContainer}>
        <img src={thumbnail} alt="YT-logo"></img>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.logoContainer}>
          <img src="Logo.svg" alt="" />
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
