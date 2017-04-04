import { combineReducers } from 'redux';
import matchSongs from './songs_reducer';
import launchIt from './launch_reducer';

export const rootReducer = combineReducers({
    songs: matchSongs,
    launch: launchIt
});