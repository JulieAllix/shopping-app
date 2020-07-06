import { 
    TOGGLE_ORDER_DETAILS, 
    CREATE_ORDER 
} from '../actions/orders';

const initialState = {
    expandOrder: false,
    orders: [],
    lastId: 0,
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ORDER_DETAILS:
            return { 
                ...state, 
                expandOrder: action.status,
            };
        case CREATE_ORDER:

            const order = {
                id: state.lastId + 1,
                content: action.cartItems,
            }

            return { 
                ...state, 
                orders: state.orders.concat(order),
                lastId: state.lastId + 1,
            };
        default:
            return state;
    }
    
}

export default ordersReducer;