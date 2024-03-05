import { useNavigate } from "react-router-dom";
import styles from "./SearchedVid.module.scss";

function SearchedVid({ video }) {
  const navigate = useNavigate();
  const {
    id: { videoId: url },
    snippet: {
      channelId,
      channelTitle,
      description,
      publishedAt,
      thumbnails,
      title,
    },
  } = video;

  const thumbnail = thumbnails?.high.url
    ? thumbnails.high.url
    : thumbnails?.medium.url
    ? thumbnails.medium.url
    : thumbnails.default.url;
  console.log(video);
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
          <p className={`${styles.title} ${styles.twoLines}`}>{title}</p>
        </div>
        <div>
          <p className={`${styles.info} ${"text-secondary-color"}`}>
            {channelTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchedVid;
