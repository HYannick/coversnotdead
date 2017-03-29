import { combineReducers } from 'redux';
import checkScore from './score_reducer';
import matchSongs from './songs_reducer';

export const rootReducer = combineReducers({
    songs: matchSongs
});