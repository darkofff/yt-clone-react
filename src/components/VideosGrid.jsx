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
        <div className={styles.loading}>
          <Spinner />
          <h1 className={styles.loadingMessage}>
            Please be patient. First loading may take time up to a minute due to
            poor hosting.
          </h1>
          <h1 className={styles.loadingMessage}>
            Prosimy o cierpliwość. Ładowanie - szczególnie pierwsze - może zająć
            około minuty.
          </h1>
        </div>
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
