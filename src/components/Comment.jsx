import styles from "./Comment.module.scss";

function Comment({ comment }) {
  return (
    <div className={styles.container}>
      <div className={styles.containerChild}>
        <img src={comment.authorProfileImageUrl} alt="profile-pic" />
      </div>
      <div className={styles.containerChild}>
        <p className={styles.text}>{comment.textOriginal}</p>
      </div>
    </div>
  );
}

export default Comment;
