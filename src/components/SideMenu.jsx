import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { icons } from "../utils/constants"
import { searchedVideo } from "../utils/slices";
import tw from "tailwind-styled-components";

const SideMenu = () => {
  const {GoHomeFill, PiFilmReelBold, MdOutlineVideoLibrary} = icons;
  const dispatch = useDispatch();

  return (
    <WrapperContainer>
        <Ul>
          <Li title="Home">
            <Link to={"/"} onClick={()=>dispatch(searchedVideo(null))}>
              <GoHomeFill />
            </Link>
          </Li> 
          <Li title="Shorts">
            <Link>
              <PiFilmReelBold />{" "}
            </Link>
          </Li>
          <Li title="Playlist">
            <Link>
              <MdOutlineVideoLibrary />{" "}
            </Link>
          </Li>
        </Ul>
    </WrapperContainer>
  );
};

export default SideMenu;

const WrapperContainer = tw.div`b6 flex flex-col items-center justify-center gap-1 md:p-2 opacity-0 md:opacity-100 absolute w-[0%] md:w-[5%] h-full left-1 top-0`;
const Ul = tw.ul`b6 text-3xl flex flex-col items-center justify-center gap-5 px-2 py-5 bg-[#161719] border-2 border-[#322] rounded-full shadow-md shadow-[#111]`;
const Li = tw.li`list-none relative bg-gray-600 rounded-full p-2 text-2xl bg-opacity-5 cursor-pointer shadow-md transition-colors shadow-[#0008] duration-300 ease-in-out hover:text-orange-500 hover:shadow-sm`;
