export const TOGGLE_ORDER_DETAILS = 'TOGGLE_ORDER_DETAILS';
export const CREATE_ORDER = 'CREATE_ORDER';

export const toggleOrderDetails = (id, bool) => {
    return { 
        type: TOGGLE_ORDER_DETAILS, 
        orderId: id,
        status: bool,
    };
};

export const createOrder = (cartItems) => {
    return { 
        type: CREATE_ORDER, 
        cartItems: cartItems,
    };
};