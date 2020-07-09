export const SET_SCREEN_ORIENTATION = 'SET_SCREEN_ORIENTATION';

export const setScreenOrientation = (orientation, width) => {
    return { 
        type: SET_SCREEN_ORIENTATION, 
        orientation,
        width,
    };
};
