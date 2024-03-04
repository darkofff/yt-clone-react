import styles from "./CommentsSection.module.scss";

import { memo, useEffect, useState } from "react";

import Comment from "./Comment";

function CommentsSection({ currentVideo, isLoadingCurrent }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    function callback() {
      setScreenWidth(window.innerWidth);
      console.log(screenWidth);
    }

    window.addEventListener("resize", callback);

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [screenWidth]);
  console.log(screenWidth);
  return (
    <section className={styles.container}>
      {currentVideo.length !== 0 &&
        (screenWidth >= 900 ? (
          currentVideo.comments.map((comment) => (
            <Comment comment={comment} key={comment.publishedAt} />
          ))
        ) : isExpanded ? (
          <div>
            {currentVideo.comments.map((comment) => (
              <Comment comment={comment} key={comment.publishedAt} />
            ))}
            <div
              className={`${styles.showLess} ${"hover-1"} ${"border-color "}`}
              onClick={() => setIsExpanded(false)}
            >
              <p>Show less</p>
            </div>
          </div>
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
            <p className={styles.message}>...read more</p>
          </div>
        ))}
    </section>
  );
}

export default memo(CommentsSection);

/* 
<div onClick={() => setIsExpanded(false)}>
  <p>Show less</p>
</div>
*/
