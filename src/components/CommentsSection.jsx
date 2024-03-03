import styles from "./CommentsSection.module.scss";

import { memo } from "react";

import Comment from "./Comment";

function CommentsSection({ currentVideo, isLoadingCurrent }) {
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
