import styles from "./SideNavElement.module.scss";
import { useTheme } from "../context/ThemeContext";
import { useParams } from "react-router-dom";

function SideNavElement({ type }) {
  const { site } = useParams();

  const { theme } = useTheme();
  const currTheme = theme.split("-")[0];
  return (
    <div className={`${styles.el} ${"side-nav-el"}`}>
      <img
        className={styles.img}
        src={`sidebar/${type}-${currTheme}${
          site === type ? "-selected" : ""
        }.svg`}
        alt={type}
      />
      <p className={`${styles.p} ${"text-color"}`}>{type}</p>
    </div>
  );
}

/* function SideNavElement({ children }) {
  return <div className={`${styles.el} ${"side-nav-el"}`}>{children}</div>;
} */

export default SideNavElement;
