import { createSlice } from "@reduxjs/toolkit";

const focusSlice = createSlice({
    name: "focus",
    initialState:{
        selected:false,
        count:0
    },
    reducers:{
        isSelected: (state) => {
            state.selected = !state.selected
        },
    }
});

export const { isSelected } = focusSlice.actions;
export default focusSlice.reducer;