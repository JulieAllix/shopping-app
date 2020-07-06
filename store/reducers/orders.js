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
            const cartItems = action.cartItems;
            const qtiesData = action.qtiesData;

            const updatedOrders = [...state.orders, order];

            return { 
                ...state, 
                orders: updatedOrders,
                lastId: state.lastId + 1,
            };
        default:
            return state;
    }
    
}

export default ordersReducer;