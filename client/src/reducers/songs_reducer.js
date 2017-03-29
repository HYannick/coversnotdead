import { MATCH_SONGS, REMOVE_SONG, SHUFFLE_SONGS, ADD_COMPLETED_SONG } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action) {
    let {songs} = action;
    let songList = null;
    switch(action.type){
        case SHUFFLE_SONGS:
            console.log('shuffle....');
            songList = _.shuffle(songs);
            return songList;
        case MATCH_SONGS:
            console.log(action);
            return state;
        case REMOVE_SONG:
            console.log('Removing....');
            return state;
        case ADD_COMPLETED_SONG:
            console.log('Adding to Completed Songs....');
            return state;
        default:
            return state;
    }
}