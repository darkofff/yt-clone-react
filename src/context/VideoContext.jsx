import { createContext, useContext, useMemo, useReducer } from "react";

import { shuffleData } from "../utils/shuffleData";

const BASE_URL = `http://localhost:3000`;
const VideoContext = createContext();

const initialState = {
  data: [],
  isLoading: false,
  error: false,
  currentVideo: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, data: [] };
    case "loaded/data":
      return { ...state, data: action.payload, isLoading: false };
    case "current":
      return {
        currentVideo: action.payload,
      };
    default:
      console.error("Unknown action");
  }
}

function VideoProvider({ children }) {
  const [{ data, isLoading, error, currentVideo }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function fetchHome() {
    dispatch({ type: "loading" });
    //setError(false);
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
        };
      });
      const shuffledData = shuffleData(newData.slice());
      dispatch({ type: "loaded/data", payload: shuffledData });
    } catch (err) {
      //setError("Error occured while fetching data");
      console.error(err);
    }
  }

  async function fetchComments(id) {
    dispatch({ type: "loading" });
    //setError(false);
    try {
      const res = await fetch(`${BASE_URL}/items`);
      if (!res.ok) throw new Error("Couldn't fetch data");
      const data = await res.json();
      //console.log(data);
      const [designatedVideo] = data.filter((item) => {
        if (item.snippet.resourceId.videoId === id) return item;
        return 0;
      });
      const commentsDataUnfiltered = designatedVideo.comment.items;
      const comments = commentsDataUnfiltered.map((obj) => {
        return {
          content: obj.snippet.topLevelComment.snippet.textOriginal,
          image: obj.snippet.topLevelComment.snippet.authorProfileImageUrl,
        };
      });
      const commentsShuffled = shuffleData(comments.slice());
      dispatch({ type: "loaded/data", payload: commentsShuffled });
    } catch (err) {
      //setError("Error occured while fetching data");
      console.error(err);
    }
  }

  const value = useMemo(() => {
    return {
      data,
      isLoading,
      error,
      currentVideo,
      fetchHome,
      fetchComments,
      dispatch,
    };
  }, [data, isLoading, error, currentVideo]);

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}
function useVideo() {
  const context = useContext(VideoContext);
  console.log(context);
  if (context === undefined)
    console.error("useVideo used outside of VideoProvider scope");
  return context;
}

export { VideoProvider, useVideo };
