import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState:{
        result:null,
        count:0
    },
    reducers:{
        gptResults: (state, action) => {
            state.result =  action.payload;
        },
        increaseCount: (state, action) => {
            state.count += action.payload;
        }
    }
});

export const { gptResults, increaseCount } = gptSlice.actions;
export default gptSlice.reducer;