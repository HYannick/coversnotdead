import {SHUFFLE_SONGS, ADD_COMPLETED_SONG, LAUNCH} from './types';

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

export const launchAction = (activate) => {
    return {
        type : LAUNCH,
        activate
    }
};