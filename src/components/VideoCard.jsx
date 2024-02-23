/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchChannel, convertViewsToKOrMillion,
  formatYouTubeVideoPublishedDate } from "../utils/constants";
import tw from "tailwind-styled-components";

const VideoCard = ({ info }) => {
  const { snippet, statistics = null } = info;
  const { channelTitle, title, thumbnails, channelId } = snippet;
  const { publishedAt } = snippet || {};
  const { localized } = snippet || {};
  const [channelSrc, setChannelSrc] = useState("");

  const viewCountFormatted = convertViewsToKOrMillion(statistics?.viewCount);
  let publishDate;
  try {
    publishDate = formatYouTubeVideoPublishedDate(
      localized.publishedAt || publishedAt
    );
  } catch (error) {
    publishDate = null;
  }
  useEffect(() => {
    fetchChannel(channelId).then((result) => {
      setChannelSrc(result);
    });
  }, []);

  return (
    <WrapperContainer>
      <div className="w-full">
        {thumbnails.medium.url ? (
          <img
            src={thumbnails.medium.url}
            alt={title}
            className="border-2 border-[#322] rounded-xl w-full h-full"
          />
        ) : (
          <div className="border-2 border-[#322] rounded-xl w-full h-full bg-white"></div>
        )}
      </div>
      <Info>
        <h3 className="text-md tracking-wide font-bold text-sm leading-5 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <img
            src={channelSrc}
            alt="channel icon"
            width={40}
            className="rounded-full bg-gray-800 border-2 border-gray-800"
          />
          <div className="flex flex-col gap-1">
            <Title>{channelTitle}</Title>
            <div className="flex gap-1 items-center">
              <View>
                {viewCountFormatted} {statistics && "views"}
              </View>
              <p className="w-1 h-1 bg-gray-800 rounded-full translate-y-0"></p>
              <p className="text-xs text-gray-100">{publishDate}</p>
            </div>
          </div>
        </div>
      </Info>
    </WrapperContainer>
  );
};

export default VideoCard;

const WrapperContainer = tw.div`w-70 h-70 md:w-64 md:h-70 flex flex-col gap-4 justify-start items-center mb-4 overflow-hidden`;
const Info = tw.div`flex flex-col items-start gap-4 w-full`;
const Title = tw.p`text-xs text-white`;
const View = tw.p`text-xs text-gray-100`;
