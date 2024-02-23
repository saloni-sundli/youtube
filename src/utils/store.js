import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import searchSlice from "./slices/searchSlice";
import chatSlice from "./slices/chatSlice";
import userSlice from "./slices/userSlice";
import gptSlice from "./slices/gptSlice";
import focusSlice from "./slices/focusSlice";

const store = configureStore({
    reducer: {
        app: appSlice,
        search: searchSlice,
        chat: chatSlice,
        user: userSlice,
        gpt:gptSlice,
        focus:focusSlice
    }
});

export default store;    


