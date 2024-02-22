import styles from "./VideosGrid.module.scss";

import { useVideo } from "../context/VideoContext";

import Video from "./Video";
import { useEffect } from "react";

function VideosGrid() {
  const { data, isLoading, error, fetchRecommendations, setCurrent, dispatch } =
    useVideo();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.h1}>Recomended Videos</h1>
      </header>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={`${styles.grid} ${"bg-color"}`}>
          {data.map((video) => (
            <Video
              video={video}
              setCurrent={setCurrent}
              dispatch={dispatch}
              key={video.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default VideosGrid;
