import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.scss";

import { memo } from "react";

function VideoPlayer({ size, videoUrl }) {
  return (
    <div
      className={`${styles["player-container"]} ${
        styles[`player-container-${size}`]
      }`}
    >
      <div
        className={`${styles["player-wrapper"]} ${
          styles[`player-wrapper-${size}`]
        }`}
      >
        <ReactPlayer
          className={styles["react-player"]}
          controls={true}
          url={`https://www.youtube.com/watch?v=${videoUrl}`}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default memo(VideoPlayer);
