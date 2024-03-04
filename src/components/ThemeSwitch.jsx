import styles from "./ThemeSwitch.module.scss";
import { useTheme } from "../context/ThemeContext";

function Switch() {
  const { theme, setTheme } = useTheme();

  function handleIsChecked(e) {
    setTheme((theme) => (theme === "light-mode" ? "dark-mode" : "light-mode"));
  }

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.input}
        checked={theme === "light-mode" ? false : true}
        onChange={handleIsChecked}
      />
      <span className={styles.slider}></span>
    </label>
  );
}

export default Switch;
