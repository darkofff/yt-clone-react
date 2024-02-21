import styles from "./Main.module.scss";

import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className={styles.container}>
      <SearchBar />
      <Outlet />
    </div>
  );
}

export default Main;
