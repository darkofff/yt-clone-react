import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.scss";

import { useNavigate, useSearchParams } from "react-router-dom";
import { memo, useEffect } from "react";

function VideoPlayer({ size }) {
  const [searchParams] = useSearchParams();
  const videoUrl = searchParams.get("v");

  const navigate = useNavigate();
  useEffect(() => {
    if (videoUrl === null || videoUrl === "") navigate("/home");
  }, [videoUrl, navigate]);

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
