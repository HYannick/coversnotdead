import {DECREMENT_COUNTER} from '../actions/types';
export default (state = 30, action) => {
    console.log(action)
    switch (action.type) {
        case DECREMENT_COUNTER:
            return state = state - 1;
        default:
            return state
    }
}