import { INC_SCORE,SHUFFLE_SONGS, RESET_SONGS, ADD_COMPLETED_SONG, DECREMENT_COUNTER } from './types';

export const checkScore = (score) => {
    return {
        type : INC_SCORE,
        score
    }
};

export const decrementCounter = (count) => {
    return {
        type : DECREMENT_COUNTER,
        count
    }
};

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

export const resetSongs = (songs) => {
    return {
        type : RESET_SONGS,
        songs
    }
};