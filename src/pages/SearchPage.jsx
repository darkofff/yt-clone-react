import Sidebar from "../components/Sidebar";
import SearchResults from "../components/SearchResults";

function Search() {
  return (
    <div>
      <Sidebar />
      <div className={`${"main"} ${"bg-color"}`}>
        <SearchResults />
      </div>
    </div>
  );
}

export default Search;
