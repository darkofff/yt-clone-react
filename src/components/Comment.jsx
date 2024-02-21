import styles from "./Comment.module.scss";

function Comment({ comment }) {
  return (
    <div className={styles.container}>
      <div className={styles.containerChild}>
        <img src={comment.image} alt="profile-pic" />
      </div>
      <div className={styles.containerChild}>
        <p className={styles.text}>{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
