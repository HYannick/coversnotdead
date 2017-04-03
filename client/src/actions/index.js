import {SHUFFLE_SONGS, RESET_SONGS, ADD_COMPLETED_SONG} from './types';

export const addCompletedSong = (songs, id) => {
    return {
        type : ADD_COMPLETED_SONG,
        songs, id
    }
};
export const shuffleTracks = (songs) => {
    return {
        type : SHUFFLE_SONGS,
        songs
    }
};