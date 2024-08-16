import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from 'redux-persist-indexeddb-storage';
import { combineReducers } from 'redux';

// Create a reducer slice (example)
const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    content: '<p>This is the initial content of the editor.</p>',
    color: '#ffffff'
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.color = action.payload;
    }
  }
});

export const { setContent, setBackgroundColor } = editorSlice.actions;

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
    }
  }
});

export const { setPageContent, setPageBackgroundColor, addPage, switchPage } = pagesSlice.actions;

const rootReducer = combineReducers({
  editor: editorSlice.reducer,
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