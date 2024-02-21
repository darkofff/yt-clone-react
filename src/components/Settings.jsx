import styles from "./Settings.module.scss";

import ThemeSwitch from "./ThemeSwitch";

function Settings() {
  return (
    <div className={styles.container}>
      <ThemeSwitch />
    </div>
  );
}

export default Settings;
