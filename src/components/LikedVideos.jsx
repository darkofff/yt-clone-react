import styles from "./LikedVideos.module.scss";

import { useEffect, useState } from "react";
import { useVideo } from "../context/VideoContext";

import Spinner from "./Spinner";
import LikedVid from "./LikedVid";

function LikedVideos() {
  const [likedVideos] = useState(() => {
    const data = JSON.parse(localStorage.getItem("likeStatus"));
    if (data === null) return [];
    const likedVideos = data.likedVideos;
    return likedVideos;
  });

  const { isLoading, fetchRecommendations, data } = useVideo();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);
  console.log(data.filter((vid) => likedVideos.includes(vid.id)));

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.likesContainer}>
      {likedVideos.length === 0 && (
        <div className={styles.emptyMessage}>
          <h1>Wow so empty. Like some videos to fill this place up!</h1>
        </div>
      )}
      {likedVideos.length !== 0 && (
        <div>
          {/* <h1>LIKED VIDS SUMMARY</h1> */}
          <div className={styles.titleContainer}>
            <h1>Liked Videos</h1>
          </div>
          {data
            .filter((vid) => likedVideos.includes(vid.id))
            .map((vid, i) => (
              <LikedVid key={vid.id} video={vid} />
            ))}
        </div>
      )}
    </div>
  );
}

export default LikedVideos;
