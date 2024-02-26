import styles from "./WatchMain.module.scss";

import { useEffect, useState } from "react";

import VideoPlayer from "./VideoPlayer";
import RecommendedVideos from "./RecommendedVideos";
import CommentsSection from "./CommentsSection";
import VideoStats from "./VideoStats";

function WatchMain() {
  const [videoPlayerSize, setVideoPLayerSize] = useState("default");
  // default and theater

  function handleVideoPlayerSize() {
    setVideoPLayerSize((size) => (size === "default" ? "theater" : "default"));
  }

  return (
    <div className={`${"main"} ${styles[`main-${videoPlayerSize}`]}`}>
      <div className={styles.videoPlayer}>
        <VideoPlayer size={videoPlayerSize} />
      </div>
      <div className={styles.recommendedVideos}>
        <RecommendedVideos />
      </div>
      <div className={styles.videoDetails}>
        <div>
          <VideoStats onVideoPlayerSize={handleVideoPlayerSize} />
        </div>
        <div>
          <CommentsSection />
        </div>
      </div>
    </div>
  );
}

export default WatchMain;

/* 
# searchParams:
  - in CommentsSection and RecommendedVideo (at least)
  - move them both to WatchMain()

# useVideo 
  - in CommentsSection

# setCurrent in 

*/
