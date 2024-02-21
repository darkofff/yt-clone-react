import styles from "./Video.module.scss";
import { useNavigate } from "react-router-dom";

const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Optional: Smooth scrolling animation
  });
};

function Video({ title, thumbnail, url }) {
  const navigate = useNavigate();

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
        <p className={`${"text"} ${styles.title}`}>{title}</p>
        <p className="text">STATS</p>
      </div>
    </div>
  );
}

export default Video;
