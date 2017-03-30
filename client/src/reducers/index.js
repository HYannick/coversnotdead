import { combineReducers } from 'redux';
//import checkScore from './score_reducer';
import matchSongs from './songs_reducer';
import decrementCounter from './counter_reducer';

export const rootReducer = combineReducers({
    songs: matchSongs,
    counter: decrementCounter
});