/* eslint-disable react/prop-types */
import tw from "tailwind-styled-components"

const ChatMessage = ({ name, message }) => {
    return (
      <WrapperContainer>
        <div className="w-8 h-8 rounded-full bg-gray-600 mr-2 border-2 border-[#3336]"></div>
        <span className="font-bold">{name}</span>
        <span>{message}</span>
      </WrapperContainer>
    )
  }
  
  export default ChatMessage

  const WrapperContainer = tw.div`flex items-center w-full gap-2 p-2 border-b-2 border-[#1113]`;