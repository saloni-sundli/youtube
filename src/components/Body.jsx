import { Outlet } from "react-router-dom";
import { Head, SideMenu } from ".";
import tw from "tailwind-styled-components";

const Body = () => {
  return (
    <>
      <SideMenu />
      <WrapperContainer>
        <Head />
        <Outlet />
      </WrapperContainer>
    </>
  );
};

export default Body;

const WrapperContainer = tw.div`b5 w-full h-full p-2 bg-[#212123] scrollbar-hide`;
