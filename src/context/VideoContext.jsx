import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { shuffleData } from "../utils/shuffleData";

//const BASE_URL = `http://localhost:3000`;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const VideoContext = createContext();
const initialState = {
  data: [],
  isLoading: false,
  isLoadingCurrent: false,
  error: false,
  currentVideo: [],
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
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
      const newData = data.map((obj) => {
        return {
          title: obj.title,
          thumbnail: obj.thumbnail,
          url: obj.url,
          id: obj.id,
          videoOwnerChannelTitle: obj.videoOwnerChannelTitle,
          publishedAt: obj.publishedAt,
          channelImg: obj.details.channelImg,
        };
      });
      const shuffledData = shuffleData(newData.slice());
      dispatch({ type: "loaded/data", payload: shuffledData });
    } catch (err) {
      //setError("Error occured while fetching data");
      console.error(err);
    } finally {
      dispatch({ type: "loading/end" });
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

      if (videoObjTemp.length === 0) {
        // VIDEO DATA FETCH START
        const response = await fetch(
          `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${url}`,
          options
        );
        const data = await response.json();
        const videoDetailsObj = data.items.at(0);
        let thumbnail = videoDetailsObj.snippet.thumbnails?.maxres.url;
        if (thumbnail === undefined)
          thumbnail = videoDetailsObj.snippet.thumbnails?.high.url;
        if (thumbnail === undefined)
          thumbnail = videoDetailsObj.snippet.thumbnails?.medium.url;
        if (thumbnail === undefined)
          thumbnail = videoDetailsObj.snippet.thumbnails?.standard.url;
        if (thumbnail === undefined)
          thumbnail = videoDetailsObj.snippet.thumbnails?.default.url;
        if (thumbnail === undefined) thumbnail = "";

        const videoDataObj = {
          id: videoDetailsObj.id,
          publishedAt: videoDetailsObj.snippet.publishedAt,
          title: videoDetailsObj.snippet.localized.title,
          description: videoDetailsObj.snippet.localized.description,
          videoOwnerChannelTitle: videoDetailsObj.snippet.channelTitle,
          thumbnail,
          url,
          videoOwnerChannelId: videoDetailsObj.snippet.channelId,
          videoStats: videoDetailsObj.statistics,
        };

        // VIDEO DATA FETCH END

        //CHANNEL DATA FETCH START

        const channelRes = await fetch(
          `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${videoDataObj.videoOwnerChannelId}`,
          options
        );
        const channelData = await channelRes.json();
        const channelDetailsObj = channelData.items.at(0);
        let channelImg = channelDetailsObj.snippet.thumbnails?.high.url;
        if (channelImg === undefined)
          channelImg = channelDetailsObj.snippet.thumbnails?.medium.url;
        if (channelImg === undefined)
          channelImg = channelDetailsObj.snippet.thumbnails?.default.url;
        if (channelImg === undefined)
          channelImg = channelDetailsObj.snippet.thumbnails?.default.url;
        if (channelImg === undefined) channelImg = "";
        const channelDataObj = {
          channelImg,
          subsCount: channelDetailsObj.statistics.subscriberCount,
        };

        // CHANNEL DATA FETCH END
        // VIDEO COMMENTS FETCH START

        const commentsRes = await fetch(
          `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${url}&maxResults=100`,
          options
        );

        const commentsData = await commentsRes.json();
        let comments;

        if (!commentsData.error) {
          comments = commentsData.items.map((item) => {
            return {
              id: item.id,
              textOriginal: item.snippet.topLevelComment.snippet.textOriginal,
              authorDisplayName:
                item.snippet.topLevelComment.snippet.authorDisplayName,
              authorProfileImageUrl:
                item.snippet.topLevelComment.snippet.authorProfileImageUrl,
              authorChannelUrl:
                item.snippet.topLevelComment.snippet.authorChannelUrl,
              authorChannelId:
                item.snippet.topLevelComment.snippet.authorChannelId,
              likeCount: item.snippet.topLevelComment.snippet.likeCount,
              publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
            };
          });
        } else {
          comments = [];
        }

        // VIDEO COMMENTS FETCH END

        const ultimateObj = {
          ...videoDataObj,
          details: channelDataObj,
          comments,
        };
        dispatch({ type: "current", payload: ultimateObj });
      } else {
        dispatch({ type: "current", payload: videoObjTemp[0] });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "loading/endCurr" });
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
