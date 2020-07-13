export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const SET_PRODUCT_INFO = 'SET_PRODUCT_INFO';
export const SET_TITLE = 'SET_TITLE';
export const SET_PRICE = 'SET_PRICE';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const SET_IMAGE = 'SET_IMAGE';
export const CREATE_OBJECT = 'CREATE_OBJECT';
export const SET_PRICE_STATUS = 'SET_PRICE_STATUS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

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

export const setProductInfo = (title, description, imageUrl, bool, productId) => {
    return { 
        type: SET_PRODUCT_INFO, 
        title,
        description, 
        imageUrl,
        status: bool,
        productId
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

export const setPriceStatus = (bool) => {
    return { 
        type: SET_PRICE_STATUS, 
        status: bool,
    };
};

export const addProduct = () => {
    return { 
        type: ADD_PRODUCT, 
    };
};

export const setEditMode = (id) => {
    return { 
        type: SET_EDIT_MODE, 
        productId: id,
    };
};

export const editProduct = (id) => {
    return { 
        type: EDIT_PRODUCT, 
        productId: id,
    };
};

export const deleteProduct = (id) => {
    return { 
        type: DELETE_PRODUCT, 
        productId: id,
    };
};




