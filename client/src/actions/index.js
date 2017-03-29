import { INC_SCORE, MATCH_SONGS,SHUFFLE_SONGS } from './types';

export const checkScore = (score) => {
    return {
        type : INC_SCORE,
        score
    }
};

export const matchSongs = (songs, id) => {
    return {
        type : MATCH_SONGS,
        songs, id
    }
};
export const shuffleTracks = (songs) => {
    return {
        type : SHUFFLE_SONGS,
        songs
    }
};