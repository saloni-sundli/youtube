import { GoHomeFill } from "react-icons/go";
import { PiFilmReelBold, PiCubeFocusFill } from "react-icons/pi";
import {
  MdOutlineVideoLibrary,
  MdLogout,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { SiOpenai } from "react-icons/si";
import { AiFillCaretLeft } from "react-icons/ai";
import { FaUserAstronaut } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import openai from "./openai";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
export const OFFSET_LIVE_CHAT = 10;
export const CHANNEL =
  "https://www.googleapis.com/youtube/v3/channels?key=" + GOOGLE_API_KEY;
export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=IN&key=" +
  GOOGLE_API_KEY;

const YOUTUBE_LIST = "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key="+GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const USER_AVATAR =
  "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e";

export const YOUTUBE_VIDEO_SEARCH_API = (key) => {
  return (
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${key}&key=` +
    GOOGLE_API_KEY
  );
};

/* ************************* ICONS ************************* */

export const icons = {
  GoHomeFill,
  PiFilmReelBold,
  MdOutlineVideoLibrary,
  FiSearch,
  BsRobot,
  SiOpenai,
  PiCubeFocusFill,
  AiFillCaretLeft,
  VscSettings,
IoMdClose,
  MdLogout,
  FaUserAstronaut,
};

/* ************************* API FUNCTIONS ************************* */

export const getVideoData = async (id) => {
  const data = await fetch(YOUTUBE_VIDEO_SEARCH_API(id));
  const json = await data.json();
  return json.items[0].snippet;
};

export const getVideos = async () => {
  const data = await fetch(YOUTUBE_VIDEOS_API);
  const json = await data.json();
  return json.items;
};

export const getVideoList = async () => {
  const data = await fetch(YOUTUBE_LIST);
  const json = await data.json();
  return json;
};

export const fetchChannel = async (channel) => {
  const data = await fetch(CHANNEL + "&id=" + channel + "&part=snippet");
  const json = await data.json();
  const channelData = json.items[0].snippet;
  const channelThumbnailUrl = channelData.thumbnails.medium.url;
  return channelThumbnailUrl;
};

export const fetchVideosOfChannel = async (videoId) => {
  const channel = await getVideoData(videoId);
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }&channelId=${channel.channelId}&part=snippet,id&order=date&maxResults=20`
  );
  const json = await data.json();
  return json;
};

export const getSearchSuggestion = async (searchQuery) => {
  const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
  const json = await data.json();
  return json[1];
};

export const gptSearch = async (searchText) => {
  const gptQuery =
    "Act as a Youtube Videos bot and Recommendation system and give answer to the query : " +
    searchText;

  const gptResults = await openai.chat.completions.create({
    messages: [{ role: "user", content: gptQuery }],
    model: "gpt-3.5-turbo",
  });

  return gptResults;
};

export const getVideosSearch = async (keyword) => {
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${keyword}&type=video&key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }`
  );
  const json = await data.json();
  return json.items;
};

/* ************************* Helper Function ************************* */

export const convertViewsToKOrMillion = (viewCount) => {
  if (!viewCount) return;
  if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + "M";
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + "K";
  } else {
    return viewCount.toString();
  }
};

export function formatYouTubeVideoPublishedDate(publishedAt) {
  const currentDate = new Date();
  const publishedDate = new Date(publishedAt);

  const yearDiff = currentDate.getFullYear() - publishedDate.getFullYear();
  const monthDiff = currentDate.getMonth() - publishedDate.getMonth();
  const dayDiff = currentDate.getDate() - publishedDate.getDate();

  if (yearDiff > 0) {
    return `${yearDiff} ${yearDiff === 1 ? "year" : "years"} ago`;
  } else if (monthDiff > 0) {
    return `${monthDiff} ${monthDiff === 1 ? "month" : "months"} ago`;
  } else if (dayDiff > 0) {
    return `${dayDiff} ${dayDiff === 1 ? "day" : "days"} ago`;
  } else {
    return "today";
  }
}
