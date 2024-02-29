import styles from "./RecommendedVideos.module.scss";

import RecommendedVideo from "./RecommendedVideo";
import { memo } from "react";

function RecommendedVideos({ data, currentVideo }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Recommended videos</h1>
      {data !== undefined &&
        data.map((video) => {
          if (video.url === currentVideo.url) return null;
          return <RecommendedVideo video={video} key={video.url} />;
        })}
    </div>
  );
}

export default memo(RecommendedVideos);
