import {LAUNCH} from '../actions/types';
export default function(state = false, action) {
    let launched = state;

    switch(action.type){
        case LAUNCH:
            launched = action.activate;
            console.log(launched);
            return launched;
        default:
            return state;
    }
}