// src/store/pagesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getRandomHtmlDesign } from '../data/htmlStrings'; // Import the function

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: [{
      content: ''
    }],
    currentPageIndex: 0,
    displayColorPicker: false,
  },
  reducers: {
    setPageContent: (state, action) => {
      state.pages[state.currentPageIndex].content = action.payload;
    },
    setPageBackgroundColor: (state, action) => {
      state.pages[state.currentPageIndex].color = action.payload;
    },
    addPage: (state) => {
      state.pages.push({
        content: getRandomHtmlDesign(),
        color: '#ffffff',
      });
      state.currentPageIndex = state.pages.length - 1;
    },
    switchPage: (state, action) => {
      state.currentPageIndex = action.payload;
    },
    deletePage: (state, action) => {
      const indexToDelete = action.payload;
      state.pages.splice(indexToDelete, 1);
      if (state.currentPageIndex >= state.pages.length) {
        state.currentPageIndex = state.pages.length - 1;
      }
      if (state.currentPageIndex < 0) {
        state.currentPageIndex = 0;
      }
    },
    displayColorPicker: (state, action) => {
      state.displayColorPicker = action.payload;
    },
  },
});

export const { setPageContent, setPageBackgroundColor, addPage, switchPage, deletePage, displayColorPicker } = pagesSlice.actions;

export default pagesSlice.reducer;
