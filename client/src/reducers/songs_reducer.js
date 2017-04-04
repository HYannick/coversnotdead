import {SHUFFLE_SONGS, ADD_COMPLETED_SONG} from '../actions/types';
import _ from 'lodash';

const removeById = (state = [], id) => {
    return state.filter(song => song.id !== id);
};

export default function(state = [], action) {
    let {songs} = action;
    let songList = null;
    switch(action.type){
        case SHUFFLE_SONGS:
            console.log('shuffle....');
            songList = _.shuffle(songs);
            return songList;
        case ADD_COMPLETED_SONG:
            console.log('adding completed ...');
            songList = removeById(state, action.id);
            return songList;
        default:
            return state;
    }
}