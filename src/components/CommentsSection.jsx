import styles from "./CommentsSection.module.scss";

import { memo, useEffect, useState } from "react";

import Comment from "./Comment";

function CommentsSection({ currentVideo, isLoadingCurrent }) {
  const [screenWidth, setScreenWidth] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    function callback() {
      setScreenWidth(window.screen.width);
    }

    window.addEventListener("resize", callback);

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, []);
  return (
    <section className={styles.container}>
      {currentVideo.length !== 0 &&
        (screenWidth >= 900 ? (
          currentVideo.comments.map((comment) => (
            <Comment comment={comment} key={comment.publishedAt} />
          ))
        ) : isExpanded ? (
          currentVideo.comments.map((comment) => (
            <Comment comment={comment} key={comment.publishedAt} />
          ))
        ) : (
          <div
            className={`${styles.collapsedContainer} ${"bg-color-2"}`}
            onClick={() => setIsExpanded((v) => !v)}
          >
            <div>
              <h1>Comments: {currentVideo.comments.length} </h1>
            </div>
            <Comment
              comment={currentVideo.comments.at(0)}
              key={currentVideo.id.at(0)}
            />
          </div>
        ))}
    </section>
  );
}

export default memo(CommentsSection);
