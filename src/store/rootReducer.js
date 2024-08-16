// src/store/rootReducer.js
import { combineReducers } from 'redux';
import pagesReducer from './pagesSlice';
import { persistReducer } from 'redux-persist';
import storage from './storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  pages: pagesReducer,
});

export default persistReducer(persistConfig, rootReducer);
