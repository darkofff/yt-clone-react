import styles from "./SearchBar.module.scss";

import Logo from "./Logo";
import Search from "./Search";
import Settings from "./Settings";

function SearchBar() {
  return (
    <header className={`${styles.header} ${"bg-color"}`}>
      <Logo />
      <Search />
      <Settings />
    </header>
  );
}

export default SearchBar;
