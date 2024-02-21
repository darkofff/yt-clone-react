import { useSearchParams } from "react-router-dom";

function useCurrentVideo(url) {
  const [searchParams, setSearchParams] = useSearchParams();

  const videoUrl = searchParams.get("v");

  return { videoUrl };
}
