import styles from "./SearchedVid.module.scss";

function SearchedVid({ video }) {
  const {
    id,
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

  function handleClick() {}
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
          <p className={`${styles.info} ${"text-secondary-color"}`}>
            {channelTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchedVid;
