import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getVideos } from "../utils/constants";
import { VideoCard } from ".";
import tw from "tailwind-styled-components";

const VideoContainer = () => {
  const [videos, setVideos] = useState(null);
  const searchedVideos = useSelector((store) => store.search.videos);

  useEffect(() => {
    setVideos([]);
    if (searchedVideos) {
      setVideos(searchedVideos);
    } else {
      getVideos().then((result) => {
        setVideos(result);
      });
    }
  }, [searchedVideos]);

  if (!videos) return null;

  return (
    <WrapperContainer>
      {videos && (
        <VideoLayout>
          {searchedVideos
            ? videos.map((video) => (
                <Link
                  to={`/watch?v=${video.id.videoId}`}
                  key={video.id.videoId}
                >
                  <VideoCard info={video} />
                </Link>
              ))
            : videos.map((video) => (
                <Link to={`/watch?v=${video.id}`} key={video.id}>
                  <VideoCard info={video} />
                </Link>
              ))}
          {/* videoId */}
        </VideoLayout>
      )}
    </WrapperContainer>
  );
};

export default VideoContainer;

const WrapperContainer = tw.div`b2 h-[100%] md:h-[90%] flex flex-wrap py-4 w-full justify-center items-center gap-4 scrollbar-hide`;
const VideoLayout = tw.div`b2 h-full flex flex-wrap py-4 w-full justify-center items-center gap-4 side-bar overflow-y-scroll`;
