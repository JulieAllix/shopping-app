export const TOGGLE_ORDER_DETAILS = 'TOGGLE_ORDER_DETAILS';

export const toggleOrderDetails = (id, bool) => {
    return { 
        type: TOGGLE_ORDER_DETAILS, 
        orderId: id,
        status: bool,
    };
};