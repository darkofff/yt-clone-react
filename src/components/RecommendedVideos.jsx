import styles from "./RecommendedVideos.module.scss";

import { useVideo } from "../context/VideoContext";

import RecommendedVideo from "./RecommendedVideo";
import { memo, useEffect } from "react";

function RecommendedVideos() {
  const { data, currentVideo, setCurrent, fetchRecommendations } = useVideo();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations, currentVideo]);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Recommended videos</h1>
      {data !== undefined &&
        data.map((video) => {
          if (video.url === currentVideo.url) return null;
          return (
            <RecommendedVideo
              video={video}
              setCurrent={setCurrent}
              key={video.url}
            />
          );
        })}
    </div>
  );
}

export default memo(RecommendedVideos);
