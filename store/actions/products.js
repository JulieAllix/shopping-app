export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const SET_TITLE = 'SET_TITLE';
export const SET_PRICE = 'SET_PRICE';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const SET_IMAGE = 'SET_IMAGE';
export const CREATE_OBJECT = 'CREATE_OBJECT';

export const addToCart = (id) => {
    return { 
        type: ADD_TO_CART, 
        productId: id 
    };
};

export const removeFromCart = (id) => {
    return { 
        type: REMOVE_FROM_CART, 
        productId: id 
    };
};

export const emptyCart = () => {
    return { 
        type: EMPTY_CART, 
    };
};

export const setTitle = (value) => {
    return { 
        type: SET_TITLE, 
        value: value,
    };
};

export const setPrice = (value) => {
    return { 
        type: SET_PRICE, 
        value: value,
    };
};

export const setDescription = (value) => {
    return { 
        type: SET_DESCRIPTION, 
        value: value,
    };
};

export const setImageUrl = (value) => {
    return { 
        type: SET_IMAGE, 
        value: value,
    };
};

export const createNewObject = () => {
    return { 
        type: CREATE_OBJECT, 
    };
};

