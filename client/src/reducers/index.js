import { combineReducers } from 'redux';
import matchSongs from './songs_reducer';

export const rootReducer = combineReducers({
    songs: matchSongs
});