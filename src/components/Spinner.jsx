import styles from "./Spinner.module.css";

import { useTheme } from "../context/ThemeContext";

function Spinner() {
  const { theme } = useTheme();

  return (
    <div className={styles.spinnerContainer}>
      
      <div
        className={
          theme === "dark-mode"
            ? `${styles.spinner} ${styles.dark}`
            : `${styles.spinner} ${styles.light}`
        }
      ></div>
    </div>
  );
}

export default Spinner;
