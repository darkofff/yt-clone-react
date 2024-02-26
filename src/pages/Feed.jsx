import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

function Feed() {
  return (
    <>
      <Sidebar />
      <div className={`${"main"} ${"bg-color"}`}>
        <Outlet />
      </div>
    </>
  );
}
export default Feed;
