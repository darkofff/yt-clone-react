import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";

import SideNavElement from "./SideNavElement";

function Sidebar() {
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];
  return (
    <aside className={`${styles.sidebar}  ${"bg-color"}`}>
      <NavLink to="/feed/home">
        <SideNavElement type="home" currPath={path} />
      </NavLink>
      <NavLink to="/feed/shorts">
        <SideNavElement type="shorts" currPath={path} />
      </NavLink>
    </aside>
  );
}

export default Sidebar;
