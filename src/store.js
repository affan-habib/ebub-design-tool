import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from 'redux-persist-indexeddb-storage';
import { combineReducers } from 'redux';

// Create a reducer slice (example

// Create a reducer slice for pages
const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: [{ content: '<p>This is the initial content of the editor.</p>', color: '#ffffff' }],
    currentPageIndex: 0,
  },
  reducers: {
    setPageContent: (state, action) => {
      state.pages[state.currentPageIndex].content = action.payload;
    },
    setPageBackgroundColor: (state, action) => {
      state.pages[state.currentPageIndex].color = action.payload;
    },
    addPage: (state) => {
      state.pages.push({ content: '', color: '#ffffff' });
      state.currentPageIndex = state.pages.length - 1; // Switch to the new page
    },
    switchPage: (state, action) => {
      state.currentPageIndex = action.payload;
    },
    deletePage: (state, action) => {
      const indexToDelete = action.payload; // Get the index to delete
      state.pages.splice(indexToDelete, 1); // Remove the page at the specified index
      if (state.currentPageIndex >= state.pages.length) {
        state.currentPageIndex = state.pages.length - 1; // Adjust current index if needed
      }
      // Ensure currentPageIndex is not negative
      if (state.currentPageIndex < 0) {
        state.currentPageIndex = 0; // Reset to first page if all pages are deleted
      }
    }
  }
});

export const { setPageContent, setPageBackgroundColor, addPage, switchPage, deletePage } = pagesSlice.actions;

const rootReducer = combineReducers({
  pages: pagesSlice.reducer, // Add pages reducer
});

const persistConfig = {
  key: 'root',
  storage: createIdbStorage({ name: 'myApp' }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);