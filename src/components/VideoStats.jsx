import styles from "./VideoStats.module.scss";
import Switch from "./Switch";

function VideoStats({ onVideoPlayerSize }) {
  return (
    <div className={styles.container}>
      <span> Enable theater mode</span>
      <span>
        <Switch callback={onVideoPlayerSize} />
      </span>
      <h1>likes</h1>
      <h1>subs</h1>
      <h1>chanel info</h1>
      <h1>video description</h1>
    </div>
  );
}

export default VideoStats;
