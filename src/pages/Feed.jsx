import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Feed() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
export default Feed;
