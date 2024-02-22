import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { shuffleData } from "../utils/shuffleData";

const BASE_URL = `http://localhost:3000`;
const VideoContext = createContext();

const initialState = {
  data: [],
  isLoading: false,
  isLoadingCurrent: false,
  error: false,
  currentVideo: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "loading/start":
      return { ...state, isLoading: true, data: [] };
    case "loading/end":
      return { ...state, isLoading: false };
    case "loading/startCurr":
      return { ...state, isLoadingCurrent: true };
    case "loading/endCurr":
      return { ...state, isLoadingCurrent: false };
    case "loaded/data":
      return { ...state, data: action.payload };
    case "current":
      return {
        ...state,
        currentVideo: action.payload,
      };
    default:
      console.error("Unknown action");
  }
}

function VideoProvider({ children }) {
  const [{ data, isLoading, isLoadingCurrent, error, currentVideo }, dispatch] =
    useReducer(reducer, initialState);

  const fetchRecommendations = useCallback(async function fetchHome() {
    dispatch({ type: "loading/start" });
    //setError(false);
    try {
      const res = await fetch(`${BASE_URL}/items`);
      if (!res.ok) throw new Error("Couldn't fetch data");
      const data = await res.json();
      //console.log(data);
      const newData = data.map((obj) => {
        return {
          title: obj.title,
          thumbnail: obj.thumbnail,
          url: obj.url,
          id: obj.id,
          videoOwnerChannelTitle: obj.videoOwnerChannelTitle,
          publishedAt: obj.publishedAt,
        };
      });
      const shuffledData = shuffleData(newData.slice());
      dispatch({ type: "loaded/data", payload: shuffledData });
    } catch (err) {
      //setError("Error occured while fetching data");
      console.error(err);
    } finally {
      dispatch({ type: "loading/end" });
      console.log("newRecom");
    }
  }, []);

  const setCurrent = useCallback(async function setCurrent(url) {
    dispatch({ type: "loading/startCurr" });
    //setError(false);
    try {
      const res = await fetch(`${BASE_URL}/items`);
      if (!res.ok) throw new Error("Couldn't fetch data");
      const data = await res.json();

      const videoObjTemp = data.filter((videoData) => {
        return videoData.url === url ? videoData : false;
      });

      dispatch({ type: "current", payload: videoObjTemp[0] });
    } catch (err) {
      //setError("Error occured while fetching data");
      console.error(err);
    } finally {
      dispatch({ type: "loading/endCurr" });
      console.log("newCurr");
    }
  }, []);

  const value = useMemo(() => {
    return {
      data,
      isLoading,
      isLoadingCurrent,
      error,
      currentVideo,
      fetchRecommendations,
      setCurrent,
      dispatch,
    };
  }, [
    data,
    isLoading,
    isLoadingCurrent,
    error,
    currentVideo,
    fetchRecommendations,
    setCurrent,
    dispatch,
  ]);

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}
function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined)
    console.error("useVideo used outside of VideoProvider scope");
  return context;
}

export { VideoProvider, useVideo };
