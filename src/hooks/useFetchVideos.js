import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { shuffleData } from "../utils/shuffleData";

const BASE_URL = `http://localhost:3000`;

function useFetchVideos(type) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const key = searchParams.get("v");

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    async function fetchHome() {
      try {
        const res = await fetch(`${BASE_URL}/items`);
        if (!res.ok) throw new Error("Couldn't fetch data");
        const data = await res.json();
        const newData = data.map((obj) => {
          let thumbnail = obj.snippet.thumbnails.standard?.url;
          if (thumbnail === undefined)
            thumbnail = obj.snippet.thumbnails.high?.url;
          if (thumbnail === undefined)
            thumbnail = obj.snippet.thumbnails.medium?.url;
          if (thumbnail === undefined)
            thumbnail = obj.snippet.thumbnails.maxres?.url;
          if (thumbnail === undefined)
            thumbnail = obj.snippet.thumbnails.default?.url;

          return {
            title: obj.snippet.title,
            thumbnail,
            url: obj.snippet.resourceId.videoId,
            id: obj.id,
          };
        });
        const shuffledData = shuffleData(newData.slice());
        setData(shuffledData);
      } catch (err) {
        setError("Error occured while fetching data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (type === "home") fetchHome();
  }, [type, key]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    async function fetchComments() {
      try {
        const res = await fetch(`${BASE_URL}/items`);
        if (!res.ok) throw new Error("Couldn't fetch data");
        const data = await res.json();
        //console.log(data);
        const [designatedVideo] = data.filter((item) => {
          if (item.snippet.resourceId.videoId === key) return item;
          return 0;
        });
        const commentsDataUnfiltered = designatedVideo.comment.items;
        const commentsDataCut = commentsDataUnfiltered.slice(0, 20);
        const comments = commentsDataCut.map((obj) => {
          return {
            content: obj.snippet.topLevelComment.snippet.textOriginal,
            image: obj.snippet.topLevelComment.snippet.authorProfileImageUrl,
            id: obj.id,
          };
        });
        const commentsShuffled = shuffleData(comments.slice());
        setData(commentsShuffled);
      } catch (err) {
        setError("Error occured while fetching data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (type === "comments") fetchComments();
  }, [type, key]);

  return [data, isLoading, error];
}

export { useFetchVideos };
