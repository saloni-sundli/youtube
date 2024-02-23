import { FilterList, VideoContainer } from "."

const MainContainer = () => {

  return (
    <div className={`b3 h-[90%] px-8 flex flex-col overflow-x-hidden scrollbar-hide`}>
      <FilterList />
      <VideoContainer />
    </div>
  )
}

export default MainContainer