import styles from "./Search.module.scss";
import { useTheme } from "../context/ThemeContext";

import { useEffect, useRef, useState } from "react";

function Search() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { theme } = useTheme();
  const input = useRef("");

  useEffect(() => {
    const inputTemp = input.current;

    function callback() {
      setIsInputFocused(true);
    }

    inputTemp.addEventListener("focus", callback);

    return () => inputTemp.removeEventListener("focus", callback);
  }, []);

  useEffect(() => {
    const inputTemp = input.current;

    function callback() {
      setIsInputFocused(false);
    }

    inputTemp.addEventListener("blur", callback);

    return () => inputTemp.removeEventListener("focus", callback);
  }, []);

  return (
    <div className={`${styles.inputBox} ${"border-color"}`}>
      {!!isInputFocused && (
        <img
          className={`${styles.magnifier} `}
          src={
            theme === "light-mode"
              ? "magnifier-light.svg"
              : "magnifier-dark.svg"
          }
          alt="magnifier"
        />
      )}
      <input
        className={`${
          styles.input
        }  ${"input-search"} ${"bg-color-2"} ${"text-color"}`}
        type="text"
        placeholder="Search"
        ref={input}
      />
      <button
        className={`${
          styles.searchButton
        } ${"input-search-btn-color"} ${"border-color"} `}
      >
        <img
          className={`${styles.magnifierBtn} `}
          src={
            theme === "light-mode"
              ? "magnifier-light.svg"
              : "magnifier-dark.svg"
          }
          alt="magnifier"
        />
      </button>
    </div>
  );
}

export default Search;
