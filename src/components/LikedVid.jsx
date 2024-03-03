import { useNavigate } from "react-router-dom";
import styles from "./LikedVid.module.scss";
function LikedVid({ video }) {
  const navigate = useNavigate();

  const {
    channelImg,
    id,
    publishedAt,
    thumbnail,
    title,
    url,
    videoOwnerChannelTitle,
  } = video;
  function handleClick() {
    navigate(`/watch?v=${url}`);
  }
  return (
    <div className={`${styles.container} ${"hover-1"}`} onClick={handleClick}>
      <div className={styles.img_container}>
        <img className={styles.img} src={thumbnail} alt="thumbnail" />
      </div>
      <div className={styles.text_container}>
        <div>
          <h1 className={`${styles.title} ${styles.twoLines}`}>{title}</h1>
        </div>
        <div>
          <p className={styles.info}>{videoOwnerChannelTitle}</p>
        </div>
      </div>
    </div>
  );
}

export default LikedVid;
