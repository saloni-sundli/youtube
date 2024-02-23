import { Provider } from "react-redux"
import { Body, WatchPage, MainContainer } from "./components"
import store from "./utils/store"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authenticate from "./components/Authenticate";

const appRouter = createBrowserRouter([{
  path:'/',
  element:<Body/>,
  children:[
    {
      path: "/",
      element: <MainContainer/>
    },
    {
      path: "watch",
      element: <WatchPage/>
    },
  ],
},{
  path: '/authenticate',
  element: <Authenticate/>
}]);

const App = () => {
  
  return (
    <Provider store={store}>
    <div className="w-screen h-screen relative flex items-center md:items-start bg-[#212123] text-white justify-between scrollbar-hide">
      <RouterProvider router={appRouter} />
    </div>
    </Provider>
  )
}

export default App

