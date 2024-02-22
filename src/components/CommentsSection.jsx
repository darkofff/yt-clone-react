import styles from "./CommentsSection.module.scss";

import { memo, useEffect, useMemo } from "react";
import { useVideo } from "../context/VideoContext";
import { useSearchParams } from "react-router-dom";

import Comment from "./Comment";
import Loader from "./Loader";

function CommentsSection() {
  const { currentVideo, setCurrent, isLoadingCurrent } = useVideo();

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("v");

  useEffect(() => {
    setCurrent(search);
  }, [setCurrent, search]);

  return (
    <section className={styles.container}>
      {currentVideo.length !== 0 &&
        currentVideo.comments.map((comment) => (
          <Comment comment={comment} key={comment.publishedAt} />
        ))}
    </section>
  );
}

export default memo(CommentsSection);
