import { useEffect, useState } from "react";

function useLikesLocalStorage(currentVideo = undefined) {
  const [isLiked, setIsLiked] = useState(() => {
    const data = localStorage.getItem("likeStatus");
    const dataJson = JSON.parse(data);

    const likedVideos = dataJson?.likedVideos;
    const dislikedVideos = dataJson?.dislikedVideos;
    //console.log(likedVideos.includes(currentVideo.id));

    if (likedVideos === undefined && dislikedVideos === undefined) {
      const newObj = {
        likedVideos: [],
        dislikedVideos: [],
      };
      localStorage.setItem("likeStatus", JSON.stringify(newObj));
      return 0;
    }

    if (likedVideos) {
      if (likedVideos.includes(currentVideo.id)) {
        return 1;
      }
    }
    if (dislikedVideos) {
      if (dislikedVideos.includes(currentVideo.id)) {
        return -1;
      }
    }

    return 0;
  });

  // -1 - dislike
  // 0 - no action
  // 1 - like

  // localStorage "likeStatus" structure
  //   {
  //     likedVideos: [...],
  //     dislikedVideos: [...],
  //   }

  useEffect(() => {
    const data = localStorage.getItem("likeStatus");
    const dataJson = JSON.parse(data);

    let likedVideos = dataJson?.likedVideos;
    let dislikedVideos = dataJson?.dislikedVideos;

    if (likedVideos === undefined) {
      likedVideos = [];
    }
    if (dislikedVideos === undefined) {
      dislikedVideos = [];
    }

    if (likedVideos.includes(currentVideo.id)) {
      setIsLiked(1);
    }

    if (dislikedVideos.includes(currentVideo.id)) {
      setIsLiked(-1);
    }
    if (
      !dislikedVideos.includes(currentVideo.id) &&
      !likedVideos.includes(currentVideo.id)
    ) {
      setIsLiked(0);
    }
  }, [currentVideo.id]);

  function handleLike(currentVideo) {
    const data = localStorage.getItem("likeStatus");
    const dataJson = JSON.parse(data);

    let likedVideos = dataJson?.likedVideos;
    let dislikedVideos = dataJson?.dislikedVideos;

    if (likedVideos === undefined) likedVideos = [];
    if (dislikedVideos === undefined) dislikedVideos = [];

    if (likedVideos.includes(currentVideo.id)) {
      likedVideos = likedVideos.filter((like) => like !== currentVideo.id);
      setIsLiked(0);
    } else {
      likedVideos = [...likedVideos, currentVideo.id];
      setIsLiked(1);
    }
    if (dislikedVideos.includes(currentVideo.id)) {
      dislikedVideos = dislikedVideos.filter(
        (dislike) => dislike !== currentVideo.id
      );
    }

    const newObj = {
      likedVideos,
      dislikedVideos,
    };
    localStorage.setItem("likeStatus", JSON.stringify(newObj));
  }
  function handleDislike() {
    const data = localStorage.getItem("likeStatus");
    const dataJson = JSON.parse(data);

    let likedVideos = dataJson?.likedVideos;
    let dislikedVideos = dataJson?.dislikedVideos;

    if (likedVideos === undefined) likedVideos = [];
    if (dislikedVideos === undefined) dislikedVideos = [];

    if (dislikedVideos.includes(currentVideo.id)) {
      dislikedVideos = dislikedVideos.filter(
        (dislike) => dislike !== currentVideo.id
      );
      setIsLiked(0);
    } else {
      dislikedVideos = [...dislikedVideos, currentVideo.id];
      setIsLiked(-1);
    }
    if (likedVideos.includes(currentVideo.id)) {
      likedVideos = likedVideos.filter((like) => like !== currentVideo.id);
    }
    const newObj = {
      likedVideos,
      dislikedVideos,
    };
    localStorage.setItem("likeStatus", JSON.stringify(newObj));
  }

  return [isLiked, handleLike, handleDislike];
}

export default useLikesLocalStorage;
