import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const valueSetterSlice = createSlice({
  name: "valueSetter",
  initialState,
  reducers: {
    changed(state, action) {
      const { payload } = action;
      state.value = payload;
    },
  },
});

export const { changed } = valueSetterSlice.actions;
export default valueSetterSlice.reducer;
