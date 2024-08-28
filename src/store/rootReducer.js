// src/store/rootReducer.js
import { combineReducers } from 'redux';
import pagesReducer from './pagesSlice';
import authReducer from './authSlice';
import { persistReducer } from 'redux-persist';
import storage from './storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  pages: pagesReducer,
  auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
