import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    lightTheme: true,
  },
  reducers: {
    toggleTheme(state) {
      state.lightTheme = !state.lightTheme;
    },
  },
});

export default themeSlice.reducer;
