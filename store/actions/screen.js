export const SET_SCREEN_ORIENTATION = 'SET_SCREEN_ORIENTATION';

export const setScreenOrientation = (value) => {
    return { 
        type: SET_SCREEN_ORIENTATION, 
        orientation: value 
    };
};