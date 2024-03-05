import styles from "./Comment.module.scss";

function Comment({ comment }) {
  //console.log(comment);
  return (
    <div className={styles.container}>
      <div className={styles.containerChild}>
        <img
          src={comment.authorProfileImageUrl}
          alt="profile-pic"
          loading="lazy"
        />
      </div>
      <div className={styles.containerChild}>
        <pre className={styles.text}>{comment.textOriginal}</pre>
      </div>
    </div>
  );
}

export default Comment;
