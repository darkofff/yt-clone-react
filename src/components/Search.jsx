import styles from "./Search.module.scss";
import { useTheme } from "../context/ThemeContext";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { theme } = useTheme();
  const input = useRef("");
  const navigate = useNavigate();

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

  function submitForm(e) {
    e.preventDefault();
    navigate(`/search?q=${inputValue}`);
  }

  return (
    <form
      className={`${styles.inputBox} ${"border-color"}`}
      onSubmit={submitForm}
    >
      {!!isInputFocused && (
        <img
          className={`${styles.magnifier} `}
          src={`/${
            theme === "light-mode"
              ? "magnifier-light.svg"
              : "magnifier-dark.svg"
          }
          `}
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className={`${
          styles.searchButton
        } ${"input-search-btn-color"} ${"border-color"} `}
        type="sumbit"
      >
        <img
          className={`${styles.magnifierBtn} `}
          src={`/${
            theme === "light-mode"
              ? "magnifier-light.svg"
              : "magnifier-dark.svg"
          }
          `}
          alt="magnifier"
        />
      </button>
    </form>
  );
}

export default Search;
