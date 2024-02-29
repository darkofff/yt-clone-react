import Sidebar from "../components/Sidebar";
import WatchMain from "../components/WatchMain";

function Watch() {
  return (
    <div>
      <Sidebar />
      <div className={`${"main"} ${"bg-color"}`}>
        <WatchMain />
      </div>
    </div>
  );
}

export default Watch;
