import styles from "./CommentsSection.module.scss";
import { useFetchVideos } from "../hooks/useFetchVideos";
import { useVideo } from "../context/VideoContext";

import Comment from "./Comment";
import { useEffect } from "react";

function CommentsSection() {
  const [data] = useFetchVideos("comments");
  //const { data, fetchComments } = useVideo();

  /* useEffect(() => {
    fetchComments();
  }, [fetchComments]);
 */
  return (
    <section className={styles.container}>
      {data.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </section>
  );
}

export default CommentsSection;
