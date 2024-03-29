import { useState } from "react";

import styles from "./Switch.module.scss";

function Switch({ callback }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleIsChecked(e) {
    setIsChecked((v) => !v);

    callback(e);
  }

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.input}
        checked={isChecked}
        onChange={handleIsChecked}
      />
      <span className={styles.slider}></span>
    </label>
  );
}

export default Switch;
