import styles from "./VideoStats.module.scss";

import VideoDescription from "./VideoDescription";
import VideoDetails from "./VideoDetails";

function VideoStats({ onVideoPlayerSize, currentVideo }) {
  if (currentVideo.videoStats === undefined) return null;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{currentVideo.title}</h1>
      <VideoDetails
        currentVideo={currentVideo}
        onVideoPlayerSize={onVideoPlayerSize}
      />
      <VideoDescription currentVideo={currentVideo} />
    </div>
  );
}

export default VideoStats;
