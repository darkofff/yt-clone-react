import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const LIGHT_MODE = "light-mode";
const DARK_MODE = "dark-mode";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const t = localStorage.getItem("theme");
    const darkThemeMq = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    if (t === null) {
      if (darkThemeMq) {
        localStorage.setItem("theme", LIGHT_MODE);
        return LIGHT_MODE;
      } else {
        localStorage.setItem("theme", DARK_MODE);
        return DARK_MODE;
      }
    }
    return t;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme used outside of ThemeProvider scope");
  return context;
}

export { ThemeProvider, useTheme };
