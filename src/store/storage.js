// src/store/storage.js
import createIdbStorage from 'redux-persist-indexeddb-storage';

const storage = createIdbStorage({ name: 'myApp' });

export default storage;
