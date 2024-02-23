import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState:{
        results:{},
        videos:null
    },
    reducers:{
        cacheResults: (state, action) => {
            // state[action.payload[0]]=action.payload[1];
            state.results = Object.assign(state.results, action.payload);
        },
        searchedVideo: (state, action) => {
            state.videos = action.payload;
        }
    }
});

export const { cacheResults, searchedVideo } = searchSlice.actions;
export default searchSlice.reducer;