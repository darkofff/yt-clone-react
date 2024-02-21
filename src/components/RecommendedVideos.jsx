import styles from "./RecommendedVideos.module.scss";
import { useFetchVideos } from "../hooks/useFetchVideos";
import RecommendedVideo from "./RecommendedVideo";
import { useSearchParams } from "react-router-dom";

function RecommendedVideos() {
  const [data] = useFetchVideos("home");
  const [searchParams] = useSearchParams();
  const currUrl = searchParams.get("v");

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Recommended videos</h1>
      {data.map((video) => {
        if (video.url === currUrl) return;
        return <RecommendedVideo video={video} key={video.url} />;
      })}
    </div>
  );
}

export default RecommendedVideos;
