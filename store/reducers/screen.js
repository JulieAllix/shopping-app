import { 
    SET_SCREEN_ORIENTATION,
} from '../actions/screen';

const initialState = {
    orientation: 'vertical',
};

const screenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCREEN_ORIENTATION:
            return { 
                ...state, 
                orientation: action.orientation,
            };
        default:
            return state;
    }
    
}

export default screenReducer;