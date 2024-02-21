import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import SideNavElement from "./SideNavElement";

function Sidebar() {
  /*  
  <Sidebar/> element accepts
  only following props 
  home
  shorts
  subscriptions
  you
  */
  return (
    <aside className={`${styles.sidebar}  ${"bg-color"}`}>
      <NavLink to="/home">
        <SideNavElement type="home" />
      </NavLink>
      <NavLink to="/shorts">
        <SideNavElement type="shorts" />
      </NavLink>
      <NavLink to="/">
        <SideNavElement type="shorts" />
      </NavLink>
      <NavLink to="/">
        <SideNavElement type="shorts" />
      </NavLink>
    </aside>
  );
}
/* function Sidebar() {
  return (
    <aside className={`${styles.sidebar} ${"bg-color"}`}>
      <NavLink to="/home">
        <SideNavElement>
          <img className={styles.img} src="home.svg" alt="home" />
          <p className={`${styles.p} ${"text-color"}`}>Home</p>
        </SideNavElement>
      </NavLink>
      <NavLink to="/">
        <SideNavElement>
          <img className={styles.img} src="home.svg" alt="home" />
          <p className={`${styles.p} ${"text-color"}`}>Shorts</p>
        </SideNavElement>
      </NavLink>
      <SideNavElement>
        <img className={styles.img} src="home.svg" alt="home" />
        <p className={`${styles.p} ${"text-color"}`}>Subs</p>
      </SideNavElement>
      <SideNavElement>
        <img className={styles.img} src="home.svg" alt="home" />
        <p className={`${styles.p} ${"text-color"}`}>You</p>
      </SideNavElement>
    </aside>
  );
} */

export default Sidebar;
