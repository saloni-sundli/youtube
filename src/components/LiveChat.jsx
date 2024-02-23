import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/slices";
import { ChatMessage } from ".";
import tw from "tailwind-styled-components";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chat = useSelector(store => store.chat.messages);
  useEffect(()=>{
      const i = setInterval(()=>{
          // API Polling
          dispatch(addMessage({
              name:"kavi negi",
              message:"hello world 🚀"
          }))
      }, 500);
      return () => clearInterval(i); 
  });

return (
  <WrapperContainer>
      <Chats>
      {
          chat.map((i, index)=>(
              <ChatMessage key={index} name={i.name} message={i.message}/>
          ))
      }
      </Chats>
      <form onSubmit={(e)=>e.preventDefault()} className="w-full flex items-center justify-center text-sm border-2 rounded-md border-gray-600 gap-4 py-3">
        <input type="text" className="bg-transparent h-full" placeholder="Your Comment" value={liveMessage} onChange={(e)=>setLiveMessage(e.target.value)} />
        <button className="h-full">▶</button>
      </form>
  </WrapperContainer>
)
}

export default LiveChat

const WrapperContainer = tw.div`w-full h-[50%] p-4 flex flex-col items-center justify-center gap-2`;
const Chats = tw.div`flex flex-col-reverse overflow-y-scroll side-bar w-full`;