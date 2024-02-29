import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.flex}>
      <Link to="home">
        <img className={styles.logo} src="../public/Logo.svg" alt="YtLogo" />
      </Link>
    </div>
  );
}

export default Logo;
