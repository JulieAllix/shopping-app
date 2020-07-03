import { TOGGLE_ORDER_DETAILS } from '../actions/orders';

const initialState = {
    expandOrder: false,
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ORDER_DETAILS:
            return { 
                ...state, 
                expandOrder: action.status,
            };
        default:
            return state;
    }
    
}

export default ordersReducer;