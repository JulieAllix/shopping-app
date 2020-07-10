import { Dimensions } from 'react-native';

import { 
    SET_SCREEN_ORIENTATION
} from '../actions/screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let orientation = '';
if (screenWidth > screenHeight) {
    orientation = 'horizontal';
} else {
    orientation = 'vertical';
};

const initialState = {
    orientation: orientation,
    width: screenWidth,
};

const screenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCREEN_ORIENTATION:
            return { 
                ...state, 
                orientation: action.orientation,
                width: action.width,
            };
        default:
            return state;
    }
    
}

export default screenReducer;