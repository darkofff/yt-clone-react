import styles from "./SideNavElement.module.scss";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";

function SideNavElement({ type, currPath }) {
  const { theme } = useTheme();
  const currTheme = theme.split("-")[0];

  return (
    <div className={`${styles.el} ${"side-nav-el"}`}>
      <img
        className={styles.img}
        src={`../public/sidebar/${type}-${currTheme}${
          currPath === type ? "-selected" : ""
        }.svg`}
        alt={type}
      />
      <p className={`${styles.p} ${"text-color"}`}>{type}</p>
    </div>
  );
}

export default SideNavElement;
