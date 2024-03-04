import { useEffect } from "react";
import styles from "./SearchResults.module.scss";
import { useSearchParams } from "react-router-dom";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");

  useEffect(() => {
    console.log("changed");
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <h1>SEARCH RESULTS</h1>
      <h1>Póki co nie ma funkcji wyszukiwania ale niedługo będzie</h1>
    </div>
  );
}

export default SearchResults;
