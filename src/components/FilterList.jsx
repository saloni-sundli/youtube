/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Button } from ".";
import { getVideoList, icons } from "../utils/constants";
import tw from "tailwind-styled-components";
import { useEffect } from "react";

const FilterList = () => {
  const { AiFillCaretLeft } = icons;
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const buttons = [
    ["All", true],
    ["Science", false],
    ["Music", false],
    ["News", false],
    ["Gaming", false],
    ["Vlogs", false],
    ["Science", false],
    ["Music", false],
    ["News", false],
    ["Gaming", false],
    ["Vlogs", false],
    ["Science", false],
    ["Music", false],
    ["News", false],
    ["Gaming", false],
    ["Vlogs", false],
  ];

  return (
    <WrapperContainer>
      <ArrowButton onClick={scrollLeft}>
        <AiFillCaretLeft />
      </ArrowButton>
      <div className="overflow-x-scroll flex items-center mx-2 gap-3 scrollbar-hide overflow-y-hidden scroll-smooth" ref={scrollRef}>
        {buttons.map((item, index) => (
          <Button key={index} name={item[0]} active={item[1]} />
        ))}
      </div>
      <ArrowButton onClick={scrollRight} className="rotate-180">
        <AiFillCaretLeft />
      </ArrowButton>
    </WrapperContainer>
  );
};

export default FilterList;

const WrapperContainer = tw.div`b4 h-[5%] md:h-[2%] z-30 pt-8 pb-2 bg-[#212123] mt-2 flex items-center justify-between scrollbar-hide`;
const ArrowButton = tw.button`text-lg text-gray-400`;
