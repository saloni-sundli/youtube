/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser, cacheResults, searchedVideo, gptResults, increaseCount, isSelected } from "../utils/slices";
import { icons, fetchVideosOfChannel, getSearchSuggestion, getVideosSearch, gptSearch } from "../utils/constants";
import { SearchComponent } from ".";
import tw from "tailwind-styled-components";

const Head = () => {
  const { VscSettings, IoMdClose, SiOpenai, PiCubeFocusFill, MdLogout, FaUserAstronaut } = icons;
  const [gpt, setGpt] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchGptQuery, setSearchGptQuery] = useState("");
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchCache = useSelector((store) => store.search.results);
  const count = useSelector((store) => store.gpt.count);
  const result = useSelector((store) => store.gpt.result);
  const focus = useSelector((store) => store.focus.selected);
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/authenticate");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const search = () => {
    // Implement your search logic here
    if (searchQuery.length >= 0) {
      getVideosSearch(searchQuery).then((result) => {
        dispatch(searchedVideo(result));
        // console.log(result);
      });
    }
  };

  const focusVideos = (id) => {
    fetchVideosOfChannel(id).then((response) => {
      console.log(response);
    });
  };

  const gptSuggestion = () => {
    if (count >= 10) return;
    gptSearch(searchGptQuery).then((response) => {
      console.log(response);
      dispatch(
        gptResults(
          searchGptQuery + "\n" + response.choices?.[0]?.message?.content
        )
      );
      setSearchGptQuery("");
      dispatch(increaseCount(1));
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // * User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        // * User is signed out
        dispatch(removeUser());
        navigate("/authenticate");
      }
    });

    // * unsubscribe when component will be unmount
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSearchQueryResult(searchCache[searchQuery]);
      } else {
        getSearchSuggestion(searchQuery).then((result) => {
          setSearchQueryResult(result);
          dispatch(cacheResults({ [searchQuery]: result[1] }));
        });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <HeadWrapper>
      <div>
        <img src="logo.png" alt="logo" className="w-12 h-10" />
      </div>
      <div className="flex items-center w-[70%] md:w-[50%] gap-2">
        <SearchComponent
          search={search}
          gpt={gpt}
          gptSuggestion={gptSuggestion}
          searchGptQuery={searchGptQuery}
          searchQuery={searchQuery}
          setSearchGptQuery={setSearchGptQuery}
          setSearchQuery={setSearchQuery}
          setShowSuggestions={setShowSuggestions}
          result={result}
          showSuggestions={showSuggestions}
          searchQueryResult={searchQueryResult}
        />

        <Button
          className={`${gpt
            ? "bg-gradient-to-r from-[#74AA9C] to-[#326d5d]"
            : "bg-[#1a1a1b] hover:bg-gradient-to-r hover:from-[#74AA9C] hover:to-[#326d5d]"
            } shadow-md shadow-[#0006] border-2 border-[#322] rounded-full p-2 text-xl hover:shadow-sm`}
          onClick={() => setGpt(!gpt)}
        >
          <SiOpenai className="cursor-pointer hover:animate-spin text-white" />
        </Button>
      </div>

      <button className="relative">
        <VscSettings
          className={`shadow-md shadow-[rgba(0,0,0,0.4)] rounded-full hover:shadow-[#0002] border-2 border-[#322] p-1 text-4xl ${showUserInfo && "opacity-0" }`}
          title="User"
          onClick={() => setShowUserInfo(!showUserInfo)}
        />
        {showUserInfo ? (
          <div className="absolute flex flex-col justify-center gap-2 items-center px-2 py-4 bg-[#1a1a1b] z-50 -top-4 -right-10 rounded-md text-center">
            <IoMdClose
          className="shadow-md shadow-[#0006] rounded-full hover:shadow-[#0002] text-2xl absolute top-2 right-2"
          title="User"
          onClick={() => setShowUserInfo(!showUserInfo)}
        />
            <FaUserAstronaut className="border-2 rounded-full p-1 text-5xl mx-auto text-gray-100"/>
            <p className="cursor-pointer text-md font-bold flex items-center justify-center w-32 gap-1" ><PiCubeFocusFill onClick={() => dispatch(isSelected())} size={30} className={`${focus ? "text-sky-600" : ""} hover:text-sky-600`} /> <MdLogout onClick={handleSignOut} size={25} className="text-red-600" /> </p>
            <p className="mx-auto font-bold text-lg capitalize text-red-600">{user.displayName}</p>
            <p className="mx-auto font-mono text-xs tracking-wide capitalize text-gray-300">{user.email}</p>
          </div>
        ) : null}
      </button>
    </HeadWrapper>
  );
};

export default Head;

const HeadWrapper = tw.div`b1 h-[10%] pt-4 pb-6 px-8 flex justify-between items-center shadow-md shadow-[#0002] border-b-2 border-[#322] z-50`;
const Button = tw.button`bg-opacity-60 rounded-r-full px-4 py-2 text-lg hover:animate-pulse shadow-md shadow-[#0001] ease-in-out hover:shadow-sm`;
