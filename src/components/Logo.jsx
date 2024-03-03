import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
import { useTheme } from "../context/ThemeContext";

function Logo() {
  const { theme } = useTheme();
  const themeFormatted = theme.split("-").at(0);
  return (
    <div className={styles.flex}>
      <Link to="home">
        <img
          className={styles.logo}
          src={`Logo-${themeFormatted}.svg`}
          alt="YtLogo"
        />
      </Link>
    </div>
  );
}

export default Logo;
