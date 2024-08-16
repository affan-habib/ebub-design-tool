import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from 'redux-persist-indexeddb-storage';
import { combineReducers } from 'redux';

// Create a reducer slice (example)
const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    content: '<p>This is the initial content of the editor.</p>'
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    }
  }
});

export const { setContent } = editorSlice.actions;

const rootReducer = combineReducers({
  editor: editorSlice.reducer,
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