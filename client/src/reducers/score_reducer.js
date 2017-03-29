import { INC_SCORE } from '../actions/types';

export default function(state = 0, action) {
    switch(action.type){
        case INC_SCORE:
            console.log(action.score);
         return state;
        default:
            return state;
    }
}