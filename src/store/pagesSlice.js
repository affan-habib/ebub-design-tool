// src/store/pagesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getRandomHtmlDesign } from '../data/htmlStrings'; // Import the function

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: [{
      content: '',
      color: '#ffffff', // Ensure color is initialized
    }],
    currentPageIndex: 0,
    displayColorPicker: false,
    scale: 1, // Add scale property
  },
  reducers: {
    setPageContent: (state, action) => {
      state.pages[state.currentPageIndex].content = action.payload;
    },
    setPageBackgroundColor: (state, action) => {
      state.pages[state.currentPageIndex].color = action.payload;
    },
    setScale: (state, action) => { // New reducer for scale
      state.scale = action.payload;
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

export const { setPageContent, setPageBackgroundColor, setScale, addPage, switchPage, deletePage, displayColorPicker } = pagesSlice.actions;

export default pagesSlice.reducer;