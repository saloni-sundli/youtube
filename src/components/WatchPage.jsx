import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/slices";
import { getVideoData } from "../utils/constants";
import {LiveChat, CommentsContainer} from ".";
import tw from "tailwind-styled-components";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    getVideoData(searchParams.get("v")).then((result) => {
      setData(result);
    });
  }, []);

  return (
    <>
      <WrapperContainer>
        <LeftSideContainer>
          <VideoContainer>
            <iframe
              className="w-full h-full"
              src={"https://www.youtube.com/embed/" + searchParams.get("v")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </VideoContainer>

          <InfoContainer>
            {data.length !== 0 ? (
              <>
                <Title>
                  {data.localized.title}
                </Title>
                <ExtraInfo>
                  <p>{data.channelTitle}</p>
                  <p>{data.publishedAt}</p>
                </ExtraInfo>
                <Desc>
                  {data.localized.description}
                </Desc>
              </>
            ) : null}
          </InfoContainer>
        </LeftSideContainer>
        <RightSideContainer>
          <LiveChat />
          <CommentsContainer />
        </RightSideContainer>
      </WrapperContainer>
    </>
  );
};

export default WatchPage;

const WrapperContainer = tw.div`flex gap-2 b3 h-[90%] py-6 px-8 md:px-16 md:pl-20`;
const LeftSideContainer = tw.div`w-[70%] flex flex-col items-center gap-2`;
const RightSideContainer = tw.div`w-[30%] flex flex-col items-center gap-2 border-2`;
const VideoContainer = tw.div` flex items-center justify-center w-full h-2/3`;
const InfoContainer = tw.div`p-2 h-1/2 overflow-hidden`;
const Title = tw.h2`text-lg h-[20%] font-bold tracking-wide`;
const ExtraInfo = tw.div`flex w-full h-[10%] my-2 justify-between`;
const Desc = tw.p`py-4 h-[70%] rounded-md text-sm leading-6 tracking-wider overflow-y-scroll side-bar font-mono`;