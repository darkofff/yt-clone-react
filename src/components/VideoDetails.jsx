import styles from "./VideoDetails.module.scss";

import { useTheme } from "../context/ThemeContext";
import { formatNumber } from "../utils/formatNumber";

import Switch from "./Switch";
import useLikesLocalStorage from "../hooks/useLikesLocalStorage";

function VideoDetails({ currentVideo, onVideoPlayerSize }) {
  const [isLiked, handleLike, handleDislike] =
    useLikesLocalStorage(currentVideo);

  const { theme } = useTheme();
  const themeFormated = theme.split("-").at(0);

  function onLike() {
    handleLike(currentVideo);
  }
  function onDislike() {
    handleDislike(currentVideo);
  }

  return (
    <div className={styles.stats}>
      <div className={`${styles.channelInfo} ${styles.flexItem}`}>
        <div className={styles.imgContainer}>
          <img src={currentVideo.details.channelImg} alt="" />
        </div>
        <div className={styles.channelDetails}>
          <p className={styles.title}>{currentVideo.videoOwnerChannelTitle}</p>
          <h1 className={`${styles.subCount} ${"text-secondary-color "}`}>
            {formatNumber(currentVideo.details.subsCount)} subscribers
          </h1>
        </div>
      </div>
      <div className={`${styles.details} ${styles.flexItem}`}>
        <div className={`${styles.likesContainer} ${"bg-color-3"}`}>
          <div
            className={`${styles.likesContainerLeft} ${"hover-2"}`}
            onClick={onLike}
          >
            <img
              className={styles.likeImg}
              src={
                isLiked === 1
                  ? `/likes/like-${themeFormated}-selected.svg`
                  : (isLiked === 0 || isLiked === -1) &&
                    `/likes/like-${themeFormated}.svg`
              }
              alt="like button"
            />
            <p className={styles.likeCount}>
              {formatNumber(currentVideo.videoStats.likeCount)}
            </p>
          </div>
          <div className={`${styles.separator} `}></div>
          <div
            className={`${styles.likesContainerRight} ${"hover-2"}`}
            onClick={onDislike}
          >
            <img
              className={styles.likeImg}
              src={
                isLiked === -1
                  ? `/likes/dislike-${themeFormated}-selected.svg`
                  : (isLiked === 0 || isLiked === 1) &&
                    `/likes/dislike-${themeFormated}.svg`
              }
              alt="like button"
            />
          </div>
        </div>

        <span className={styles.mode}>
          <Switch callback={onVideoPlayerSize} />
          <div>
            <p className={styles.tm}>Theather Mode</p>
          </div>
        </span>
      </div>
    </div>
  );
}

export default VideoDetails;
