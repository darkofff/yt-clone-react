import styles from "./WatchMain.module.scss";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVideo } from "../context/VideoContext";

import VideoPlayer from "./VideoPlayer";
import RecommendedVideos from "./RecommendedVideos";
import CommentsSection from "./CommentsSection";
import VideoStats from "./VideoStats";
import Spinner from "./Spinner";
import Lorem from "./Lorem";

function WatchMain() {
  const [videoPlayerSize, setVideoPLayerSize] = useState("default");
  // default and theater

  const [searchParams] = useSearchParams();
  const videoUrl = searchParams.get("v");

  const {
    data,
    currentVideo,
    setCurrent,
    fetchRecommendations,
    isLoading,
    isLoadingCurrent,
  } = useVideo();

  const navigate = useNavigate();
  useEffect(() => {
    if (videoUrl === null || videoUrl === "") navigate("/home");
    fetchRecommendations();
    setCurrent(videoUrl);
  }, [videoUrl, navigate, fetchRecommendations, setCurrent]);

  function handleVideoPlayerSize() {
    setVideoPLayerSize((size) => (size === "default" ? "theater" : "default"));
  }
  if (isLoading || isLoadingCurrent) return <Spinner />;
  return (
    <div className={` ${styles[`main-${videoPlayerSize}`]}`}>
      <div className={styles.videoPlayer}>
        <VideoPlayer size={videoPlayerSize} videoUrl={videoUrl} />
      </div>
      <div className={styles.recommendedVideos}>
        <RecommendedVideos
          data={data}
          currentVideo={currentVideo}
          setCurrent={setCurrent}
        />
      </div>
      <div className={styles.videoDetails}>
        <div>
          <VideoStats
            onVideoPlayerSize={handleVideoPlayerSize}
            currentVideo={currentVideo}
          />
        </div>
        <div>
          <CommentsSection
            currentVideo={currentVideo}
            isLoadingCurrent={isLoadingCurrent}
          />
        </div>
        <Lorem />
      </div>
    </div>
  );
}

export default WatchMain;
