import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.flex}>
      <h1>===</h1>
      <Link to="home">
        <img className={styles.logo} src="../public/Logo.svg" alt="YtLogo" />
      </Link>
    </div>
  );
}

export default Logo;
