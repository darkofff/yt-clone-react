import styles from "./SearchResults.module.scss";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Spinner from "./Spinner";
import SearchedVid from "./SearchedVid";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");

  const [searchedVideos, setSearchedVideos] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };
    async function fetchSearch() {
      try {
        const response = await fetch(
          `https://youtube-v31.p.rapidapi.com/search?q=${search}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`,
          options
        );
        const result = await response.json();
        console.log(result.items);
        setSearchedVideos(result.items);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSearch();
  }, [search]);

  return (
    <div className={styles.container}>
      {searchedVideos.length === 0 && (
        <div className={styles.emptyMessage}>
          <Spinner />
        </div>
      )}
      {searchedVideos.length !== 0 && (
        <div>
          <div className={styles.titleContainer}>
            <h1>Results</h1>
          </div>
          {searchedVideos.map((vid, i) => {
            return <SearchedVid key={i} video={vid} />;
          })}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
