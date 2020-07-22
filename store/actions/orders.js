export const CREATE_ORDER = 'CREATE_ORDER';

export const createOrder = (cartItems, totalPrice) => {
    return { 
        type: CREATE_ORDER, 
        cartItems: cartItems,
        totalPrice: totalPrice,
    };
};