import styles from "./VideosGrid.module.scss";

import Video from "./Video";

import { useFetchVideos } from "../hooks/useFetchVideos";

function VideosGrid() {
  const [data, isLoading, error] = useFetchVideos("home");

  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.h1}>Recomended Videos</h1>
      </header>
      <div className={`${styles.grid} ${"bg-color"}`}>
        {data.map((video) => (
          <Video
            title={video.title}
            thumbnail={video.thumbnail}
            url={video.url}
            key={video.url}
          />
        ))}
      </div>
    </main>
  );
}

export default VideosGrid;
