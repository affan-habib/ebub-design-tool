// src/store/pagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

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
        content: `
          <div style="position: relative; width: 210mm; height: 297mm; margin: 20px auto; background-image: url('https://picsum.photos/800/1200'); background-size: cover; background-position: center; overflow: scroll; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);">
      <div style="position: absolute; top: 50px; left: 50px; width: 150px; height: 150px; background-color: #3498db; transform: rotate(45deg); z-index: 1;"></div>
      <div style="position: absolute; top: 200px; left: 250px; width: 100px; height: 100px; background-color: #e74c3c; border-radius: 50%; z-index: 1;"></div>
      <div style="position: absolute; bottom: 50px; right: 50px; width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid #f1c40f; z-index: 1;"></div>

      <!-- SVG Shapes -->
      <svg style="position: absolute; top: 150px; left: 100px; z-index: 2;" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#8e44ad" />
      </svg>
      <svg style="position: absolute; top: 300px; right: 100px; z-index: 2;" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="60" fill="#27ae60" />
      </svg>
      <svg style="position: absolute; bottom: 150px; left: 50px; z-index: 2;" width="120" height="60" xmlns="http://www.w3.org/2000/svg">
        <polygon points="60,0 120,60 0,60" fill="#f39c12" />
      </svg>

      <div style="position: relative; z-index: 3; padding: 20px; color: #333; background-color: rgba(255, 255, 255, 0.8);">
          <h1>Beautiful Layout with Shapes and SVGs</h1>
          <p>This layout integrates text, geometric shapes, and SVGs with a background image from the Picsum API. The combination of rectangles, circles, triangles, and SVG shapes creates a visually dynamic design.</p>
          <p>The SVGs add scalable vector elements to the layout, which work well with different screen resolutions. This approach is ideal for creating modern, responsive documents or presentations.</p>
      </div>
  </div>
  `,
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
