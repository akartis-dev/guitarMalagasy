import { createStore } from 'redux'
import favoriteReducer from './reducers/favoriteReducers'
import fontReducer from './reducers/fontReducers'
import lastSongReducer from './reducers/lastSongReducers'
import { persistCombineReducers  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig ={
    key : 'root',
    storage : storage
}

export default createStore(persistCombineReducers (rootPersistConfig, {
    favoriteReducer, 
    fontReducer,
    lastSongReducer
}))