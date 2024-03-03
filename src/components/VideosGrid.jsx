import styles from "./VideosGrid.module.scss";

import { useVideo } from "../context/VideoContext";
import { useEffect } from "react";

import Video from "./Video";
import Spinner from "./Spinner";

function VideosGrid() {
  const { data, isLoading, error, fetchRecommendations } = useVideo();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.h1}>Recomended Videos</h1>
      </header>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={`${styles.grid} ${"bg-color"}`}>
          {data.map((video) => (
            <Video video={video} key={video.id} />
          ))}
        </div>
      )}
    </main>
  );
}

export default VideosGrid;
